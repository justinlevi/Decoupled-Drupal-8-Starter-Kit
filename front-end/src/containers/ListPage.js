import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';

import List from '../components/List';
import { graphql, compose, Query, Mutation } from 'react-apollo';
import { articlesByUser, ARTICLES_BY_USER_QUERY } from '../api/apolloProxy';

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
    // articlesByUser();
  }

  /**
  * MODAL HANDLERS
  * ----------
  */

  onDeleteModalOk = (event) => {
    event.stopPropagation();
    // this.deleteArticleMutation(this.state.activeArticleNid);
    // const { dispatch } = this.props;
    const { nid } = this.state;

    // dispatch(deleteArticle({ id: String(nid) }));
    // this.setState({
    //   isModalVisible: false,
    // });
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
    // dispatch(createArticle({ title: 'NULL' }));
  }

  selectHandler = (activeArticleNid) => {
    const { dispatch } = this.props;
    // dispatch(selectArticle({ activeArticleNid }));
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
    query={ARTICLES_BY_USER_QUERY}
    notifyOnNetworkStatusChange
  >
    {
      ({
        loading, error, data, networkStatus,
      }) => {
        if (networkStatus === 4) return 'Refetching!';
        if (loading) return 'Loading!';
        if (error) return `Error!: ${error}`;

        const articles = data.user && data.user.nodes ? data.user.nodes.articles : [];

        return (
          <ListPage articles={articles} />
        );
      }
    }
  </Query>
);

export default ListPageQueryWrapper;
