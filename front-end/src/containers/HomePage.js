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
        if (loading) return null;
        if (error) return `Error!: ${error}`;

        return (
          <Tile articles={formatData(data)} />
        );
      }
    }
  </Query>
);

export default HomeArticle;
