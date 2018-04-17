import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Redirect, withRouter } from 'react-router-dom';
import { Jumbotron, Container, Row, Col } from 'reactstrap';

import { FETCH_FRONT_PAGE_ARTICLES, GET_BANNER, articleByNid } from '../api/apolloProxy';
import formatData from '../utils/ArticlesFormatter';
import Tile from '../components/Tile';

class HomeArticle extends Component {
  state = {
    selected: false,
  }

  onClickHandler = (nid) => {
    articleByNid(String(nid)).then((res) => {
      const { path } = res.data.article.entityUrl;
      console.log(res);
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
        <Query query={GET_BANNER} pollInterval={25000}>
          {({
                loading,
                error,
                data,
                }) => {
                  if (loading) {
                    return (
                      <div className="text-center">
                        <div className="loading-text h1 text-center">Loading banner...</div>
                        <div className="loader" />
                      </div>);
                  }
                  if (error) return `Error!: ${error}`;

                  const style = {
                    backgroundImage: `linear-gradient(
                                       rgba(20,20,20, .7),
                                       rgba(20,20,20, .2)),
                                       url(${data.block.image.url})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  };

                  if (data.block) {
                    return (
                      <Jumbotron fluid style={style} className="banner-image">
                        <Container fluid>
                          <Row>
                            <Col sm={{ size: 3, order: 2, offset: 1 }}>
                              <h1 className="display-5">{data.block.blocktitle}</h1>
                              <p className="lead">{data.block.blocksummary}</p>
                            </Col>
                          </Row>

                        </Container>
                      </Jumbotron>
                    );
                  }

                  return <div>No Content Available</div>;
                }
              }
        </Query>
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
