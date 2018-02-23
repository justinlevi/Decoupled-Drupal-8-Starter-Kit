import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import CardList from '../components/CardList';

import { fetchPages, addPage, deletePage, editPage } from '../redux/page/actions';

export class ListPage extends Component {
  state = {
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
  }

  /**
  * MODAL HANDLERS
  * ----------
  */

  onDeleteModalOk = (event) => {
    event.stopPropagation();
    // this.deletePageMutation(this.state.activePage);
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
      activePage: '',
    });
  }

  /**
  * ACTION EVENT HANDLERS
  * ----------
  */

  addPageHandler= () => {
    const { dispatch } = this.props;
    dispatch(addPage({ title: 'NULL' }));
  }

  editPageHandler = (activePage) => {
    const { dispatch } = this.props;
    dispatch(editPage({ activePage }));
    dispatch(push(`/edit/${activePage.nid}/${activePage.title.replace(/ /g, '-').toLowerCase()}`));
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
      editPageHandler={this.editPageHandler}
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

export default ListPageWrapper;
