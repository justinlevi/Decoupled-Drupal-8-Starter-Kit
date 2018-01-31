import React, { Component } from 'react'
import PropTypes from 'prop-types'

import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';

import './CreateSelectContainer.css';

class CreateSelectContainer extends Component {

  static propTypes = {
    projectCreateSelectHandler: PropTypes.func.isRequired,
  }

  /**
  * LIFECYCLE 
  * ----------
  */

  constructor(props) {
    super(props);

    this.state = {
      uid: 0,
      activeNode: '',
      selectValue: 0,
      title: '',
      nodes: [],
      submitEnabled: false,
      selectEnabled: true
    }

    this.handleSubmit = this.handleSubmit.bind(this); 
  }

  componentDidMount(){
    this.fetchUid((result) => {
      this.setState({uid: result.uid});

      this.fetchNodesByUid(result.uid, (result) => {
        this.setState({nodes: result.entities})
      })
    })
  }
  
  /**
   * NETWORKING 
   * ----------
   */

  fetchUid = (onFetchComplete) => {
    this.props.client.query({ query: currentUserUid})
    .then(response => {
      onFetchComplete(response.data.currentUserContext)
    }).catch((error) => {
      console.log('error ' + error);
    });
  }

  fetchNodesByUid = (uid, onFetchComplete) => {
    const variables = {"uid": uid};
    this.props.client.query({query: nodeTitlesByUserQuery, variables: variables})
    .then(response => {
      onFetchComplete(response.data.nodeQuery)
    }).catch((error) => {
      console.log('error ' + error);
    });
  }

  addPageMutation = () => {
    const variables = {"title": this.state.title};
    this.props.client.mutate({ mutation: addPageMutation, variables: variables})
    .then(response => {
      console.log('ADD PAGE COMPLETE')
      const {uuid, nid} = response.data.addPage.entity;
      this.props.projectCreateSelectHandler(uuid, nid);
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

export default withApollo(CreateSelectContainer);  


const currentUserUid = gql `
  query{
    currentUserContext{
      uid,
      uuid
    }
  }
`;

const nodeTitlesByUserQuery = gql `
  query nodeQuery($uid: Int) {
    nodeQuery(offset:0, limit: 10, filter:{uid:$uid}){
      entities{
        ...on NodePage {
          title,
          nid,
          uuid
          images:fieldMediaImage{
            mid:targetId
          }
        }
      }
    }
  }
`;

const addPageMutation = gql `
  mutation addPage($title: String!){
    addPage(input: {title: $title}){
      entity{
        ...on NodePage {
          nid,
          uuid
        }
      }
    }
  }
`;