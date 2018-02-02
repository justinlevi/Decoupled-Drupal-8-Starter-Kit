import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withApollo } from 'react-apollo';

import { nodeTitlesByUserReverseQuery, addPageMutation } from '../shared/queries';

export class CreateSelect extends Component {

  static propTypes = {
    projectCreateSelectHandler: PropTypes.func.isRequired,
  }
  
  state = {
    uid: 0,
    activeNode: '',
    selectValue: 0,
    title: '',
    nodes: [],
    submitEnabled: false,
    selectEnabled: true
  }

  /**
  * LIFECYCLE
  * ----------
  */

  componentDidMount(){

    this.fetchNodeTitlesByUserReverseQuery((result) => {
      this.setState({
        uid: result.uid,
        nodes: result.nodes.entities
      });
    });
  }

  /**
   * NETWORKING
   * ----------
   */

  fetchNodeTitlesByUserReverseQuery = (onFetchComplete) => {
    this.props.client.query({query: nodeTitlesByUserReverseQuery})
    .then(response => {
      onFetchComplete(response.data.user)
    }).catch((error) => {
      console.log('error ' + error);
    });
  }

  addPageMutation = () => {
    const variables = {"title": this.state.title};
    this.props.client.mutate({ mutation: addPageMutation, variables: variables})
    .then(response => {
      console.log('ADD PAGE COMPLETE')
      const {uuid, nid, images} = response.data.addPage.entity;
      this.props.projectCreateSelectHandler(uuid, nid, images);
    }).catch((error) => {
      console.log('error ' + error);
    });
  }
  /**
   * CHANGE HANDLERS
   * --------------
   */


  handleSubmit = (event) => {
    event.preventDefault();

    const { selectValue } = this.state;

    if(selectValue > 0){
      // select uuid from the array of entities
      const node = this.state.nodes.find(node => node.nid === Number(selectValue));
      const uuid = node.uuid;
      this.props.projectCreateSelectHandler(uuid, selectValue, node.images);
    }else if(this.state.title.length > 5) {
      this.addPageMutation();
    }

  }

  handleSelectChange = (event) => {
    const value = event.target.value !== 'default' ? event.target.value : false;

    this.setState({
      selectValue: value,
      submitEnabled: value !== false ? true : false
    });
  }

  handleCreateInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (value.length > 0) {
      this.setState({selectValue: 0})
    }

    this.setState({
      [name]: value,
      submitEnabled: value.length > 5 ? true : false,
      selectEnabled: value.length === 0 ? true: false
    });
  }

  render() {
    return (
      <div className="createSelectContainer">
        <form>
          <div className="createNewContainer">
            <label htmlFor="title">CREATE NEW</label>
            <input id="title" name="title" type="text" placeholder="Enter a title" onChange={this.handleCreateInputChange}/>
          </div>

          <div className="or">or...</div>

          <div className="selectExistingContainer">
            <label htmlFor="selectExisting">SELECT EXISTING</label>
            <select id="selectExisting" value={this.state.selectValue} onChange={this.handleSelectChange} disabled={!this.state.selectEnabled}>
              <option value="default">choose...</option>
              {
                this.state.nodes.map((item, id) => {
                  return (<option key={item.nid} value={item.nid}>{item.title}</option>)
                })
              }
            </select>
          </div>
          <div className="submitContainer">
            <button className="btn btn-primary" disabled={!this.state.submitEnabled} onClick={this.handleSubmit}>NEXT</button>
          </div>
        </form>
      </div>
    )
  }
}

const CreateSelectWrapper = withApollo(CreateSelect);
export default CreateSelectWrapper;