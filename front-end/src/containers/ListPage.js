import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';

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
    article: false,
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

    createArticle({ title: 'NULL' }).then(function(val){
      setTimeout(function(){
        const element = document.getElementsByClassName("item-list");
        element[0].scrollIntoView({block: 'end', behavior: 'smooth'});
      }, 500);
    });

  }

  selectHandler = (nid) => {
    this.setState({ article: getArticleFromNid(this.props.articles, nid) });
  }

  deleteHandler = (event, nid) => {
    console.log(nid);
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
    const { article } = this.state;
    if (article) {
      const { nid, title } = article;
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

// ListPage.propTypes = {
//   nodes: PropTypes.func.isRequired,
// };
//
// const mapStateToProps = state => ({
//   isAuthenticated: state.authReducer.isAuthenticated,
//   isLoggingIn: state.authReducer.isLoggingIn,
//   articles: state.articleReducer.articles,
// });
// const ListPageWrapper = connect(mapStateToProps)(ListPage);

// export default compose(graphql(LIST_ARTICLES))(ListPage);

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
        if (loading) return 'Loading!';
        if (error) return `Error!: ${error}`;

        const articles = data.nodeQuery && data.nodeQuery.entities.length ? data.nodeQuery.entities: [];

        const filteredArticles = articles.map(page => {
          if(page.access === true){
            return page;
          }
        })

        return (
          <ListPage articles={filteredArticles} />
        );
      }
    }
  </Query>
);

export default ListPageQueryWrapper;
