import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Button } from 'reactstrap';
import { GET_BANNER } from '../api/apolloProxy';


class BannerFrame extends Component {
  render() {
    return (
      <Query query={GET_BANNER} >
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
                        <Col sm={{ size: 5, order: 2, offset: 1 }}>
                          <h1 className="display-5">{data.block.blocktitle}</h1>
                          <p className="lead">{data.block.blocksummary}</p>
                          <p className="lead">
                            <Button color="primary">
                              <Link
                                className="learn-more-button"
                                href={data.block.blocklink.url.path}
                                to={data.block.blocklink.url.path}
                              >Learn more
                              </Link>
                            </Button>
                          </p>
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
    );
  }
}


export default BannerFrame;
