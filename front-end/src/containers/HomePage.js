import React from 'react';
import { Query } from 'react-apollo';

import { FETCH_FRONT_PAGE_ARTICLES } from '../api/apolloProxy';

import Tile from '../components/Tile';

const formatData = data => data.nodeQuery.entities.map((val) => {
  let image = '';
  const item = {
    label: val.entityLabel,
  };

  if (val.fieldMediaImage.length) {
    image = val.fieldMediaImage[0].entity.image.derivative.url;
    item.image = image;
  }

  return item;
});


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
