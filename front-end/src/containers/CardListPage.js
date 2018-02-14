import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { withApollo } from 'react-apollo';
import { pagesByUserQuery, addPageMutation, deletePageMutation } from '../api/queries';

import CardList from 'components/CardList';


export class CardListPage extends Component {

  static propTypes = {
    projectCardListHandler: PropTypes.func.isRequired,
  }

  state = {
    activeNode: '',
    selectValue: 0,
    nodes: [],
    isModalVisible: false
  }

  /**
  * LIFECYCLE
  * ----------
  */

  componentDidMount(){
    this.fetchPagesByUserQuery((result) => {
      let nodes = result.nodes.entities.map(node => { 
        const newNode = {...node};
        newNode.images = newNode.images.map(image => {
          return {url: image.entity.image.derivative.url, mid: image.mid};
        })
        return newNode;
      });
      this.setState({
        nodes: nodes
      });
    });
  }

  fetchPagesByUserQuery = (onFetchComplete) => {
    this.props.client.query({query: pagesByUserQuery})
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
      const entity = response.data.addPage.entity;
      this.setState({
        nodes: this.state.nodes.concat([entity])
      })

      //setTimeout(() => { this.scrollToBottom() }, 250);
      //setTimeout(() => { this.props.projectCardListHandler(uuid, nid, images) }, 500)
      this.props.projectCardListHandler(entity);
    }).catch((error) => {
      console.log('error ' + error);
    });
  }

  deleteNodeFromState = (nid) => {
    let newNodes = this.state.nodes.slice();
    const index = newNodes.findIndex((n) => { return n.nid === nid;});
    if (index === -1) { return false; }

    newNodes.splice(index,1);
    this.setState({ nodes: newNodes});

    return true;
  }

  deletePageMutation = (nid) => {    
    if(this.deleteNodeFromState(nid)){
      const variables = {"id": nid};
      this.props.client.mutate({ mutation: deletePageMutation, variables: variables})
      .then(response => {
        console.log('PAGE DELETED COMPLETE')
      }).catch((error) => {
        console.log('error ' + error);
      });
    }
  }

  ctaHandler = (activeNode) => {
    this.props.projectCardListHandler(activeNode);
  }

  deleteItemHandler = (event, nid) => {
    event.stopPropagation(); 
    this.setState({
      activeNode: nid,
      isModalVisible: true
    });
  }

  onModalOk = (event) => {
    event.stopPropagation(); 
    this.deletePageMutation(this.state.activeNode); 
    this.setState({
        isModalVisible: false, 
        activeNode: ''
      });
  }

  onModalToggle = (event) => { 
    this.setState({
      isModalVisible: !this.state.isModalVisible, 
      activeNode: ''
    });
  }

  /*
    * Render
    * ----------------------
    */

   render() {
    return <CardList 
    {...this.state} 
    ctaHandler={this.ctaHandler} 
    deleteItemHandler={this.deleteItemHandler} 
    addPageMutation={this.addPageMutation} 
    onModalToggle={this.onModalToggle} 
    onModalOk={this.onModalOk} 
    />
  }
}

const CardListWrapper = withApollo(CardListPage);
export default CardListWrapper;
