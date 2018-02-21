import React, { Component } from 'react';

import { withApollo } from 'react-apollo';
import { pagesByUserQuery, addPageMutation, deletePageMutation } from '../api/queries';

import CardList from '../components/CardList';


export class ListPage extends Component {
  state = {
    activeNode: '',
    selectValue: 0,
    nodes: [],
    isModalVisible: false,
  }

  /**
  * LIFECYCLE
  * ----------
  */

  componentDidMount() {
    this.fetchPagesByUserQuery((result) => {
      const nodes = result.nodes.entities.map((node) => {
        const newNode = { ...node };
        newNode.images = newNode.images.map(image => (
          { url: image.entity.image.derivative.url, mid: image.mid }
        ));
        return newNode;
      });
      this.setState({
        nodes,
      });
    });
  }

  onModalOk = (event) => {
    event.stopPropagation();
    this.deletePageMutation(this.state.activeNode);
    this.setState({
      isModalVisible: false,
      activeNode: '',
    });
  }

  onModalToggle = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      activeNode: '',
    });
  }


  fetchPagesByUserQuery = (onFetchComplete) => {
    const { client } = this.props;
    client.query({ query: pagesByUserQuery })
      .then((response) => {
        onFetchComplete(response.data.user);
      }).catch((error) => {
        console.log(`error ${error}`);
      });
  }

  addPageMutation = (title) => {
    const { client, projectCardListHandler } = this.props;
    const variables = { title };
    client.mutate({ mutation: addPageMutation, variables })
      .then((response) => {
        console.log('ADD PAGE COMPLETE');
        const { entity } = response.data.addPage;
        this.setState({
          nodes: this.state.nodes.concat([entity]),
        });

        // setTimeout(() => { this.scrollToBottom() }, 250);
        // setTimeout(() => { projectCardListHandler(uuid, nid, images) }, 500)
        projectCardListHandler(entity);
      }).catch((error) => {
        console.log(`error ${error}`);
      });
  }

  deleteNodeFromState = (nid) => {
    const newNodes = this.state.nodes.slice();
    const index = newNodes.findIndex(n => n.nid === nid);
    if (index === -1) { return false; }

    newNodes.splice(index, 1);
    this.setState({ nodes: newNodes });

    return true;
  }

  deletePageMutation = (nid) => {
    const { client } = this.props;
    if (this.deleteNodeFromState(nid)) {
      const variables = { id: nid };
      client.mutate({ mutation: deletePageMutation, variables })
        .then((response) => {
          console.log(`PAGE DELETED COMPLETE${response}`);
        }).catch((error) => {
          console.log(`error ${error}`);
        });
    }
  }

  ctaHandler = (activeNode) => {
    // const { projectCardListHandler } = this.props;
    // projectCardListHandler(activeNode);

  }

  deleteItemHandler = (event, nid) => {
    event.stopPropagation();
    this.setState({
      activeNode: nid,
      isModalVisible: true,
    });
  }

  /*
    * Render
    * ----------------------
    */

  render() {
    return (<CardList
      {...this.state}
      ctaHandler={this.ctaHandler}
      deleteItemHandler={this.deleteItemHandler}
      addPageMutation={this.addPageMutation}
      onModalToggle={this.onModalToggle}
      onModalOk={this.onModalOk}
    />);
  }
}

export const ListPageWrapper = withApollo(ListPage);
export default ListPageWrapper;
