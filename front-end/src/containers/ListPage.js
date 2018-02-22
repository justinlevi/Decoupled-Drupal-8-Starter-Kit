import React, { Component } from 'react';

import { connect } from 'react-redux';
// import { withApollo } from 'react-apollo';
// import { pagesByUserQuery, addPageMutation, deletePageMutation } from '../api/apolloProxy';

import CardList from '../components/CardList';

import { fetchPages, addPage, deletePage } from '../redux/page/actions';

export class ListPage extends Component {
  state = {
    // activeNode: '',
    // selectValue: 0,
    // nodes: [],
    nid: 0,
    isModalVisible: false,
  }

  /**
  * LIFECYCLE
  * ----------
  */

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPages());


    // this.fetchPagesByUserQuery((result) => {
    //   const nodes = result.nodes.entities.map((node) => {
    //     const newNode = { ...node };
    //     newNode.images = newNode.images.map(image => (
    //       { url: image.entity.image.derivative.url, mid: image.mid }
    //     ));
    //     return newNode;
    //   });
    //   this.setState({
    //     nodes,
    //   });
    // });
  }

  onDeleteModalOk = (event) => {
    event.stopPropagation();
    // this.deletePageMutation(this.state.activeNode);
    const { dispatch } = this.props;
    const { nid } = this.state;

    dispatch(deletePage({ id: nid }));
    this.setState({
      isModalVisible: false,
    });
  }

  onDeleteModalToggle = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      activeNode: '',
    });
  }


  // fetchPagesByUserQuery = (onFetchComplete) => {
  //   const { client } = this.props;
  //   client.query({ query: pagesByUserQuery })
  //     .then((response) => {
  //       onFetchComplete(response.data.user);
  //     }).catch((error) => {
  //       console.log(`error ${error}`);
  //     });
  // }

  addPageHandler= (title) => {
    const { dispatch } = this.props;
    dispatch(addPage({ title }));
    // const { client, projectCardListHandler } = this.props;
    // const variables = { title };
    // client.mutate({ mutation: addPageMutation, variables })
    //   .then((response) => {
    //     console.log('ADD PAGE COMPLETE');
    //     const { entity } = response.data.addPage;
    //     this.setState({
    //       nodes: this.state.nodes.concat([entity]),
    //     });

    //     // setTimeout(() => { this.scrollToBottom() }, 250);
    //     // setTimeout(() => { projectCardListHandler(uuid, nid, images) }, 500)
    //     projectCardListHandler(entity);
    //   }).catch((error) => {
    //     console.log(`error ${error}`);
    //   });
  }

  // deleteNodeFromState = (nid) => {
  //   const newNodes = this.state.nodes.slice();
  //   const index = newNodes.findIndex(n => n.nid === nid);
  //   if (index === -1) { return false; }

  //   newNodes.splice(index, 1);
  //   this.setState({ nodes: newNodes });

  //   return true;
  // }

  // deletePageMutation = (nid) => {
  //   const { client } = this.props;
  //   if (this.deleteNodeFromState(nid)) {
  //     const variables = { id: nid };
  //     client.mutate({ mutation: deletePageMutation, variables })
  //       .then((response) => {
  //         console.log(`PAGE DELETED COMPLETE${response}`);
  //       }).catch((error) => {
  //         console.log(`error ${error}`);
  //       });
  //   }
  // }

  ctaHandler = (activeNode) => {
    // const { projectCardListHandler } = this.props;
    // projectCardListHandler(activeNode);

  }

  deletePageHandler = (event, nid) => {
    event.stopPropagation();
    this.setState({
      nid,
      isModalVisible: true,
    });
  }

  /*
    * Render
    * ----------------------
    */

  render() {
    return (<CardList
      {...this.props}
      {...this.state}
      ctaHandler={this.ctaHandler}
      deletePageHandler={this.deletePageHandler}
      addPageHandler={this.addPageHandler}
      onDeleteModalToggle={this.onDeleteModalToggle}
      onDeleteModalOk={this.onDeleteModalOk}
    />);
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  isLoggingIn: state.authReducer.isLoggingIn,
  pages: state.pageReducer.pages,
});
const ListPageWrapper = connect(mapStateToProps)(ListPage);
// export const ListPageWrapper = withApollo(ListPage);

export default ListPageWrapper;
