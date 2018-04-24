import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Button, Form, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { GET_BANNER, updateBannerMutation, fileUploadMutation, SESSION_QUERY } from '../api/apolloProxy';
import { readFile } from '../utils/ImageHelpers';

class BannerFrame extends Component {
  state = {
    editClicked: false,
    title: '',
    body: '',
    image: {},
  }

  onEditClick = () => {
    this.setState({
      editClicked: true,
    });
  }

  onChangeHandler = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  createFileObject = (file, maxWidth = 500, maxHeight = 250) => {
    readFile(file, 500, 250, (resizeDataUrl) => {
      const fileObject = {
        mid: `temp_${new Date().getTime()}`, // temporary id
        url: resizeDataUrl,
        fileSize: file.size || file.fileSize,
        fileName: file.name,
        file,
      };

      this.setState({
        image: fileObject,
      });
    });
  };

  handleFile = ({ target: { files } }) => {
    this.createFileObject(files);
  }

  handleSave = async () => {
    const media = await fileUploadMutation(this.state.image);
    console.log(media);

    this.setState({
      editClicked: false,
    });
  }

  handleCancle = () => {
    this.setState({
      editClicked: false,
    });
  }

  componentsWillMount() {
    this.setState(this.state);
  }

  render() {
    const { isAuthenticated } = this.props;
    const { editClicked } = this.state;

    return (
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
                if (editClicked) {
                  const { blocktitle: title, blocksummary: body } = data.block;
                  return (
                    <div>
                      <Container>
                        <Form>
                          <Input
                            type="text"
                            name="title"
                            id="bannerTitle"
                            placeholder="Title"
                            value={this.state.title ? this.state.title : title}
                            onChange={this.onChangeHandler}
                          />
                          <Input
                            type="textarea"
                            name="body"
                            id="bannerBody"
                            placeholder="Summary"
                            value={this.state.body ? this.state.body : body}
                            onChange={this.onChangeHandler}
                          />
                          <Input type="file" name="file" id="bannerImage" onChange={this.handleFile} />
                          <Button name="save" id="bannerSave" color="primary" onClick={this.handleSave}>Save</Button>
                          <Button name="cancle" id="bannerCancle" onClick={this.handleCancle}>Cancel</Button>
                        </Form>
                      </Container>
                    </div>
                  );
                }

                return (
                  <Jumbotron fluid style={style} className="banner-image">
                    {isAuthenticated ? <button className="banner-edit" onClick={this.onEditClick}><i className="fas fa-edit" /></button> : null}
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

BannerFrame.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};


const BannerFrameQueryWrapper = () => (
  <Query
    query={SESSION_QUERY}
    notifyOnNetworkStatusChange
  >
    {
      ({
        loading, error, data, networkStatus,
      }) => {
        if (networkStatus === 4) return 'Refetching!';
        if (loading) return 'Loading!';
        if (error) return `Error!: ${error}`;

        const { isAuthenticated } = data.session;

        return (
          <BannerFrame isAuthenticated={isAuthenticated} />
        );
      }
    }
  </Query>
);

export default BannerFrameQueryWrapper;
