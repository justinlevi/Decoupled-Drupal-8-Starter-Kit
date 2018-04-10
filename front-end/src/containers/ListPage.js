import React, { Component } from 'react';
import { arrayOf, shape } from 'prop-types';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import ARTICLE_SHAPE from '../utils/articlePropType';
import List from '../components/List';
import { createArticle, deleteArticle, FETCH_ALL_ARTICLES_WITH_PERMISSIONS } from '../api/apolloProxy';

export const getArticleFromNid = (articles, nid) => {
  const index = articles.findIndex(item => item.nid === nid);
  return articles[index];
};

export class ListPage extends Component {
  state = {
    nid: 0,
    isModalVisible: false,
    selected: false,
  }

  /**
  * MODAL HANDLERS
  * ----------
  */

  onDeleteModalOk = (event) => {
    event.stopPropagation();
    const { nid } = this.state;
    deleteArticle({ id: String(nid) });
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
    createArticle({ title: 'NULL' }).then((val) => {
      setTimeout(() => {
        const element = document.getElementsByClassName('item-list');
        element[0].scrollIntoView({ block: 'end', behavior: 'smooth' });
      }, 500);
    });
  }

  selectHandler = (nid) => {
    const { articles } = this.props;
    this.setState({ selected: getArticleFromNid(articles, nid) });
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
    const { selected } = this.state;
    if (selected) {
      const { nid, title } = selected;
      return (<Redirect to={`/edit/${nid}/${title.replace(/ /g, '-').toLowerCase()}`} />);
    }

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
        if (loading) return <div className="text-center"><div className="loading-text h1 text-center">Loading...</div><div className="loader"></div></div>;
        if (error) return `Error!: ${error}`;

        const articles = data.nodeQuery && data.nodeQuery.entities.length ?
          data.nodeQuery.entities : [];
        const filteredArticles = articles.map(page => (page.access === true ? page : null));

        return (
          <ListPage articles={filteredArticles.filter(Boolean)} />
        );
      }
    }
  </Query>
);

export default ListPageQueryWrapper;
