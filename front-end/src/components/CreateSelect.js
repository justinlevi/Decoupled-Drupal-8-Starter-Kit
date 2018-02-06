import React, { Component } from 'react';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
// import Transition from 'react-transition-group/Transition';

import PropTypes from 'prop-types'

import { withApollo } from 'react-apollo';

import { nodeTitlesByUserReverseQuery, addPageMutation, deletePageMutation } from '../shared/queries';
import HCard from './HCard';

import MdAdd from 'react-icons/lib/md/add';

const Fade = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={1000}
    classNames="fade"
  >
    {children}
  </CSSTransition>
);

export class CreateSelect extends Component {

  static propTypes = {
    projectCreateSelectHandler: PropTypes.func.isRequired,
  }
  
  listEnd = undefined;

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

  addPageMutation = (title) => {
    const variables = {"title": title};
    this.props.client.mutate({ mutation: addPageMutation, variables: variables})
    .then(response => {
      console.log('ADD PAGE COMPLETE')
      this.setState({
        nodes: this.state.nodes.concat([response.data.addPage.entity])
      })

      const {uuid, nid, images} = response.data.addPage.entity;

      setTimeout(() => { this.scrollToBottom() }, 250);
      setTimeout(() => { this.props.projectCreateSelectHandler(uuid, nid, images) }, 750)
    }).catch((error) => {
      console.log('error ' + error);
    });
  }


  deletePageMutation = (nid) => {    
    if(this.delete(nid)){
      const variables = {"id": nid};
      this.props.client.mutate({ mutation: deletePageMutation, variables: variables})
      .then(response => {
        console.log('PAGE DELETED COMPLETE')
      }).catch((error) => {
        console.log('error ' + error);
      });
    }
  }


  /**
   * HELPERS
   */

  delete = (nid) => {
    let newNodes = this.state.nodes.slice();
    const index = newNodes.findIndex((n) => { return n.nid === nid;});
    if (index === -1) { return false; }

    newNodes.splice(index,1);
    this.setState({ nodes: newNodes});

    return true;
  }
  /**
   * CHANGE HANDLERS
   * --------------
   */


  // handleSubmit = (event) => {
  //   event.preventDefault();

  //   const { selectValue } = this.state;

  //   if(selectValue > 0){
  //     // select uuid from the array of entities
  //     const node = this.state.nodes.find(node => node.nid === Number(selectValue));
  //     const uuid = node.uuid;
  //     this.props.projectCreateSelectHandler(uuid, selectValue, node.images);
  //   }else if(this.state.title.length > 5) {
  //     this.addPageMutation(this.state.title);
  //   }

  // }

  ctaHandler = (uuid, nid, images) => {
    this.props.projectCreateSelectHandler(uuid, nid, images);
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

  scrollToBottom = () => {
    this.listEnd.scrollIntoView({ behavior: "smooth" });
  }

  render() {

    const items = this.state.nodes.map(
      (item, id) => {

        return (
          <Fade duration={1000} key={item.nid} timeout={{enter:0, exit: 1000}}>
            <HCard {...item} 
              ctaHandler={this.ctaHandler} 
              deleteHandler={this.deletePageMutation} 
            />
          </Fade>
        )
      }
    );

    return (
      <div className="">

        <div className="container">

            <div className="py-3" onClick={() => { this.addPageMutation('NULL');} }>
              <div className="add">
                <MdAdd />
                <h2 className="card-title">Add</h2>
              </div>
            </div>

            <TransitionGroup className="item-list">
              {items}
            </TransitionGroup>
            <div style={{ float:"left", clear: "both" }}
              ref={(el) => { this.listEnd = el; }}>
            </div>
        </div>
          
      </div>
    )
  }
}

const CreateSelectWrapper = withApollo(CreateSelect);
export default CreateSelectWrapper;
