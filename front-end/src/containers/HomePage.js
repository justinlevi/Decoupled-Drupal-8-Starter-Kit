import React from 'react';
import { Query } from 'react-apollo';

import { FETCH_FRONT_PAGE_ARTICLES } from '../api/apolloProxy';
import {formatData} from "../utils/ArticlesFormatter";
import Tile from '../components/Tile';

export const HomeArticle = () => (
  <Query query={FETCH_FRONT_PAGE_ARTICLES} pollInterval={25000}>
    {({
      loading,
      error,
      data,
      startPolling,
      stopPolling,
      }) => {
        if (loading) return <div className="text-center"><div className="loading-text h1 text-center">Loading...</div><div className="loader"></div></div>;
        if (error) return `Error!: ${error}`;

        return (
          <Tile articles={formatData(data)} />
        );
      }
    }
  </Query>
);

export default HomeArticle;
