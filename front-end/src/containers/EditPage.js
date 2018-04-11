import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, FormGroup, Input } from 'reactstrap';
import { Query } from 'react-apollo';

import ARTICLE_SHAPE from '../utils/articlePropType';
import Gallery from './GalleryFrame';
import { ARTICLE_BY_NID, updateArticleMutation } from '../api/apolloProxy';

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

  updateNode = async () => {
    const { title, body, article } = this.state;

    const mids = article.images.map(item => item.mid);
    const variables = {
      id: String(article.nid),
      title: title === '' ? 'NULL' : title,
      body,
      fieldMediaImage: mids,
    };
    try {
      await updateArticleMutation(variables);
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

        <Form>
          <FormGroup>
            <Input name="title" placeholder="Title" bsSize="lg" onChange={this.handleInputChange} value={title} />
            <Input name="body" placeholder="Body" type="textarea" bsSize="lg" onChange={this.handleInputChange} value={body} />
          </FormGroup>
        </Form>

        <Gallery article={article} />

      </div>
    );
  }
}

EditPage.propTypes = {
  article: PropTypes.shape(ARTICLE_SHAPE).isRequired,
};


// Fetching again here to make sure we're editing the latest.
// Could possibly edit from cache as well, but that seems kinda dangerous??
const EditPageQueryWrapper = () => (
  <Query
    query={ARTICLE_BY_NID}
    variables={{ nid: document.location.pathname.split('/')[2] }}
    notifyOnNetworkStatusChange
  >
    {
      ({
        loading, error, data: { article }, networkStatus,
      }) => {
        if (networkStatus === 4) return 'Refetching!';
        if (loading) return <div className="text-center"><div className="loading-text h1 text-center">Loading...</div><div className="loader" /></div>;
        if (error) return `Error!: ${error}`;

        return (
          <EditPage article={article} />
        );
      }
    }
  </Query>
);

export default withRouter(EditPageQueryWrapper);
