import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';

import List from '../components/List';

import { fetchArticles, addArticle, deleteArticle, selectArticle } from '../redux/article/actions';

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

  addHandler= () => {
    const { dispatch } = this.props;
    dispatch(addArticle({ title: 'NULL' }));
  }

  selectHandler = (activeArticleNid) => {
    const { dispatch } = this.props;
    dispatch(selectArticle({ activeArticleNid }));
    // dispatch(push(`/edit/${activeArticleNid.nid}/${activeArticleNid.title.replace(/ /g, '-').toLowerCase()}`));
  }

  deleteHandler = (event, nid) => {
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
      selectHandler={this.selectHandler}
      deleteHandler={this.deleteHandler}
      addHandler={this.addHandler}
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
  articles: state.articleReducer.articles,
});
const ListPageWrapper = connect(mapStateToProps)(ListPage);

export default ListPageWrapper;
