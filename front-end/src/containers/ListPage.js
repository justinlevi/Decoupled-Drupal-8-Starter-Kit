import React, { Component } from 'react';
import { arrayOf, shape } from 'prop-types';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import ARTICLE_SHAPE from '../utils/articlePropType';
import List from '../components/List';
import { createArticleMutation, deleteArticleMutation, FETCH_ALL_ARTICLES_WITH_PERMISSIONS } from '../api/apolloProxy';
import formatData from '../utils/ArticlesFormatter';

export const getArticleFromNid = (articles, nid) => {
  const index = articles.findIndex(item => item.nid === nid);
  return articles[index];
};

export class ListPage extends Component {
  state = {
    nid: 0,
    isModalVisible: false,
    redirect: false,
    path: false,
  }

  /**
  * MODAL HANDLERS
  * ----------
  */

  onDeleteModalOk = (event) => {
    event.stopPropagation();
    const { nid } = this.state;
    deleteArticleMutation({ id: String(nid) });
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
    createArticleMutation({ title: 'NULL' }).then(() => {
      setTimeout(() => {
        const element = document.getElementsByClassName('item-list');
        element[0].scrollIntoView({ block: 'end', behavior: 'smooth' });
      }, 500);
    });
  }

  selectHandler = (nid) => {
    const { articles } = this.props;
    const article = getArticleFromNid(articles, nid);
    const { path } = article.entityUrl;
    this.setState({ redirect: true, path });
  }

  editHandler = (nid) => {
    const { articles } = this.props;
    const article = getArticleFromNid(articles, nid);
    const { title } = article;
    const path = `/edit/${nid}/${title.replace(/ /g, '-').toLowerCase()}`;
    this.setState({ redirect: true, path });
  }

  deleteHandler = (nid) => {
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
    const { redirect, path } = this.state;
    if (redirect) {
      return (<Redirect to={path} />);
    }

    return (<List
      {...this.props}
      {...this.state}
      selectHandler={this.selectHandler}
      editHandler={this.editHandler}
      deleteHandler={this.deleteHandler}
      addHandler={this.addHandler}
      onDeleteModalToggle={this.onDeleteModalToggle}
      onDeleteModalOk={this.onDeleteModalOk}
    />);
  }
}

ListPage.propTypes = {
  articles: arrayOf(shape(ARTICLE_SHAPE).isRequired).isRequired,
};

const ListPageQueryWrapper = () => (
  <Query
    query={FETCH_ALL_ARTICLES_WITH_PERMISSIONS}
    notifyOnNetworkStatusChange
  >
    {
      ({
        loading, error, data, networkStatus,
      }) => {
        if (networkStatus === 4) return 'Refetching!';
        if (loading) return <div className="text-center"><div className="loading-text h1 text-center">Loading...</div><div className="loader" /></div>;
        if (error) return `Error!: ${error}`;

        const articles = formatData(data);

        return (
          <ListPage articles={articles} />
        );
      }
    }
  </Query>
);

export default ListPageQueryWrapper;
