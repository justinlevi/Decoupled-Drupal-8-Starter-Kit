import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';

import List from '../components/List';

import { fetchPages, deletePage, selectPage } from '../redux/page/actions';

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
    // this.deletePageMutation(this.state.activePageNid);
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
      activePageNid: 0,
    });
  }

  /**
  * ACTION EVENT HANDLERS
  * ----------
  */

  selectPageHandler = (activePageNid) => {
    const { dispatch } = this.props;
    dispatch(selectPage({ activePageNid }));
    // dispatch(push(`/edit/${activePageNid.nid}/${activePageNid.title.replace(/ /g, '-').toLowerCase()}`));
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
    return (<List
      {...this.props}
      {...this.state}
      selectPageHandler={this.selectPageHandler}
      deletePageHandler={this.deletePageHandler}
      addPageHandler={this.addPageHandler}
      onDeleteModalToggle={this.onDeleteModalToggle}
      onDeleteModalOk={this.onDeleteModalOk}
    />);
  }
}

ListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  isLoggingIn: state.authReducer.isLoggingIn,
  pages: state.pageReducer.pages,
});
const ListPageWrapper = connect(mapStateToProps)(ListPage);

export default ListPageWrapper;
