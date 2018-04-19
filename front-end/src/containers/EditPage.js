import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, FormGroup, Input, Label, Container } from 'reactstrap';
import { Mutation, Query } from 'react-apollo';

import ARTICLE_SHAPE from '../utils/articlePropType';

// import Gallery from './GalleryFrame';
import { MediaImageField } from './MediaImageField';

import { UPDATE_ARTICLE_MUTATION, ARTICLE_BY_NID } from '../api/apolloProxy';

export class EditPage extends Component {
  /*
  * Constructor
  * ----------------------
  */
  constructor(props) {
    super(props);

    const { article } = props;

    const { title, body } = article;

    this.state = {
      saveTimeout: undefined,
      article,
      title: title === null || title === 'NULL' ? '' : title,
      body: body === null ? '' : body.value,
    };
  }

  catchError = (error) => {
    console.log(`Error ${error}`);
  }

  updateNode = async ({ title, body, mids }) => {
    const { article: { images, nid } } = this.state;
    const variables = {
      id: String(nid),
      title: title === '' ? 'NULL' : title || this.state.title,
      body: body || this.state.body,
      field_media_image: mids || images.map(item => item.mid),
    };
    console.log(variables);
    try {
      await this.props.updateArticle({ variables });
    } catch (error) {
      this.catchError(error);
    }
  }

  handleInputChange = ({
    target, type,
  }) => {
    const { checked, value, name } = target;
    const newValue = type === 'checkbox' ? checked : value;
    if (this.state.saveTimeout) {
      clearTimeout(this.state.saveTimeout);
    }

    this.setState({
      [name]: newValue,
      saveTimeout: window.setTimeout(() => { this.updateNode(); }, 2000),
    });
  }

  /*
  * Render
  * ----------------------
  */

  render() {
    const { article, title, body } = this.state;
    return (
      <div className="EditPageContainer">
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
              <MediaImageField article={article} updateNode={this.updateNode} />
            </FormGroup>
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

            return (
              <EditPage article={article} updateArticle={updateArticle} />
            );
          }
        }
      </Query>
    )}
  </Mutation>
);

export default withRouter(EditPageWrapper);
