import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, FormGroup, Input, Label, Container, Button } from 'reactstrap';
import { Mutation, Query } from 'react-apollo';

import ARTICLE_SHAPE from '../utils/articlePropType';

// import Gallery from './GalleryFrame';
import { MediaImageField } from './MediaImageField';

import { UPDATE_ARTICLE_MUTATION, ARTICLE_BY_NID } from '../api/apolloProxy';

export class EditPage extends Component {
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.article === prevState.article) {
  //     return null;
  //   }
  //   return { article: nextProps.article };
  // }

  state = {
    article: this.props.article,
    // mids: [],
  }

  catchError = (error) => {
    console.log(`Error ${error}`);
  }

  updateImages = (images) => {
    const article = {
      ...this.state.article,
      images: images.map(image => ({ ...image, file: {} })),
    };
    this.setState({ article }, () => {
      console.log(this.state.article);
      // this.saveChanges();
    });
  }

  saveChanges = async () => {
    const {
      article: {
        nid, title, body: { value: body }, images,
      },
    } = this.state;

    const variables = {
      id: String(nid),
      title,
      body,
      field_media_image: images.map(item => item.mid),
    };
    try {
      await this.props.updateArticle({ variables });
    } catch (error) {
      this.catchError(error);
    }
  }

  handleInputChange = ({
    target: { checked, value, name }, type,
  }) => {
    const newValue = type === 'checkbox' ? checked : value;
    const article = { ...this.state.article };
    if (name === 'body') {
      this.setState({ article: { ...article, [name]: { value: newValue } } });
    } else {
      this.setState({ article: { ...article, [name]: newValue } });
    }
  }

  /*
  * Render
  * ----------------------
  */

  render() {
    const { article: { title, body: { value: body }, images } } = this.state;
    return (
      <div className="editPageContainer">
        <Container>
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input name="title" placeholder="Title" bsSize="lg" onChange={this.handleInputChange} value={title} />
            </FormGroup>
            <FormGroup>
              <Label for="body">Body</Label>
              <Input name="body" placeholder="Body" type="textarea" bsSize="lg" onChange={this.handleInputChange} value={body} />
            </FormGroup>

            <FormGroup>
              <Label>Images</Label>
              <MediaImageField images={images} updateImages={this.updateImages} />
            </FormGroup>

            <Button onClick={this.saveChanges} color="primary" size="lg" block>SAVE CHANGES</Button>
          </Form>
          {/* <Gallery article={article} /> */}
        </Container>
      </div>
    );
  }
}

EditPage.propTypes = {
  article: PropTypes.shape(ARTICLE_SHAPE).isRequired,
  updateArticle: PropTypes.func.isRequired,
};

const normalizeArticleImages = article => article.images.map(({ entity = {}, mid }) => {
  if (entity && entity.image && entity.image.derivative && entity.image.derivative.url) {
    const { image: { derivative: { url }, file: { filesize, filename } } } = entity;
    return {
      mid,
      url,
      fileSize: filesize,
      fileName: filename,
    };
  }
  return null;
});

// Fetching again here to make sure we're editing the latest.
// Could possibly edit from cache as well, but that seems kinda dangerous??
const EditPageWrapper = () => (
  <Mutation mutation={UPDATE_ARTICLE_MUTATION}>
    {(updateArticle, { loading: mutationLoading, error: mutationError }) => (
      <Query
        query={ARTICLE_BY_NID}
        variables={{ nid: document.location.pathname.split('/')[2] }}
        notifyOnNetworkStatusChange
      >
        {
          ({
            loading: queryLoading, error: queryError, data: { article }, networkStatus,
          }) => {
            if (networkStatus === 4) return 'Refetching!';
            if (queryLoading) return <div className="text-center"><div className="loading-text h1 text-center">Loading...</div><div className="loader" /></div>;
            if (queryError) return `Error!: ${queryError}`;

            const normalizedImages = normalizeArticleImages(article);
            const normalizedArticle = { ...article, images: normalizedImages };
            return (
              <EditPage article={normalizedArticle} updateArticle={updateArticle} />
            );
          }
        }
      </Query>
    )}
  </Mutation>
);

export default withRouter(EditPageWrapper);
