import React, { Component } from 'react';

import {formatData} from "../utils/ArticlesFormatter";
import Tile from '../components/Tile';
import { FETCH_ALL_ARTICLES } from '../api/apolloProxy';
import { Query } from 'react-apollo';

class HeroEditPage extends Component {
  render(){
    return(
      <Query query={FETCH_ALL_ARTICLES}>
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
    )
  }
}


export default HeroEditPage;
