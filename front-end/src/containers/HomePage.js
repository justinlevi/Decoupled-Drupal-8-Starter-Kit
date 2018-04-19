import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Redirect, withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';


import { FETCH_FRONT_PAGE_ARTICLES, articleByNid } from '../api/apolloProxy';
import formatData from '../utils/ArticlesFormatter';
import Tile from '../components/Tile';
import BannerFrame from './BannerFrame';

class HomeArticle extends Component {
  state = {
    selected: false,
  }

  onClickHandler = (nid) => {
    articleByNid(String(nid)).then((res) => {
      const { path } = res.data.article.entityUrl;
      this.setState({ selected: { path } });
    });
  }

  render() {
    const { selected } = this.state;
    if (selected) {
      const { path } = selected;
      return (<Redirect to={path} />);
    }
    return (
      <div>
        <BannerFrame />
        <Container>
          <Query query={FETCH_FRONT_PAGE_ARTICLES} pollInterval={25000}>
            {({
            loading,
            error,
            data,
            }) => {
              if (loading) {
                return (
                  <div className="text-center">
                    <div className="loading-text h1 text-center">Loading cards...</div>
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
        </Container>
      </div>
    );
  }
}

export default withRouter(HomeArticle);
