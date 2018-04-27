import React, { Component } from 'react';
import PropTypes, { shape } from 'prop-types';
import { Query } from 'react-apollo';

import { FETCH_ARTICLE_BY_ROUTE } from '../api/apolloProxy';
import Page from '../components/Page';
import { normalizeArticleImages } from '../utils/ArticlesFormatter';

class ContentDetailsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      path: `/articles/${props.match.params.path}`,
    };
  }

  render() {
    return (
      <Query
        query={FETCH_ARTICLE_BY_ROUTE}
        variables={{ path: this.state.path }}
        notifyOnNetworkStatusChange
      >
        {
          ({
            loading, error, data, networkStatus,
          }) => {
            if (networkStatus === 4) return 'Refetching!';
            if (loading) return <div className="text-center"><div className="loading-text h1 text-center">Loading...</div><div className="loader" /></div>;
            if (error) return `Error!: ${error}`;

            const article = data.route ? data.route.entity : null;
            const normalizedImages = normalizeArticleImages(article);
            const normalizedArticle = { ...article, images: normalizedImages };

            return (
              article ? <Page {...normalizedArticle} /> : null
            );
          }
        }
      </Query>
    );
  }
}

ContentDetailsPage.propTypes = {
  match: shape({
    params: shape({
      path: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ContentDetailsPage;
