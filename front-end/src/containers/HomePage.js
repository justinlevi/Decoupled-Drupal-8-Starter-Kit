import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { FETCH_FRONT_PAGE_ARTICLES } from '../api/apolloProxy';
import formatData from '../utils/ArticlesFormatter';
import Tile from '../components/Tile';

class HomeArticle extends Component {
  onClickHandler = (nid) => {
    console.log(nid);
  }

  render() {
    return (
      <Query query={FETCH_FRONT_PAGE_ARTICLES} pollInterval={25000}>
        {({
          loading,
          error,
          data,
          }) => {
            if (loading) {
              return (
                <div className="text-center">
                  <div className="loading-text h1 text-center">Loading...</div>
                  <div className="loader" />
                </div>);
            }
            if (error) return `Error!: ${error}`;

            const articles = formatData(data);

            if (articles.length > 0) {
              return (
                <div className="tiles-wrapper row col-12">
                  {articles.map((item, index) => (
                    <Tile
                      key={item.nid}
                      item={item}
                      index={index}
                      onClickHandler={this.onClickHandler}
                    />
                ))}
                </div>
              );
            }
            return <div>No Content Available</div>;
          }
        }
      </Query>
    );
  }
}

export default HomeArticle;
