import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';

import List from '../components/List';

import { fetchArticles, addArticle, deleteArticle, selectArticle } from '../redux/page/actions';

export class ListArticle extends Component {
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
    dispatch(fetchArticles());
  }

  /**
  * MODAL HANDLERS
  * ----------
  */

  onDeleteModalOk = (event) => {
    event.stopPropagation();
    // this.deleteArticleMutation(this.state.activeArticleNid);
    const { dispatch } = this.props;
    const { nid } = this.state;

    dispatch(deleteArticle({ id: nid }));
    this.setState({
      isModalVisible: false,
    });
  }

  onDeleteModalToggle = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      activeArticleNid: 0,
    });
  }

  /**
  * ACTION EVENT HANDLERS
  * ----------
  */

  addArticleHandler= () => {
    const { dispatch } = this.props;
    dispatch(addArticle({ title: 'NULL' }));
  }

  selectArticleHandler = (activeArticleNid) => {
    const { dispatch } = this.props;
    dispatch(selectArticle({ activeArticleNid }));
    // dispatch(push(`/edit/${activeArticleNid.nid}/${activeArticleNid.title.replace(/ /g, '-').toLowerCase()}`));
  }

  deleteArticleHandler = (event, nid) => {
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
      selectArticleHandler={this.selectArticleHandler}
      deleteArticleHandler={this.deleteArticleHandler}
      addArticleHandler={this.addArticleHandler}
      onDeleteModalToggle={this.onDeleteModalToggle}
      onDeleteModalOk={this.onDeleteModalOk}
    />);
  }
}

ListArticle.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  isLoggingIn: state.authReducer.isLoggingIn,
  articles: state.pageReducer.articles,
});
const ListArticleWrapper = connect(mapStateToProps)(ListArticle);

export default ListArticleWrapper;
