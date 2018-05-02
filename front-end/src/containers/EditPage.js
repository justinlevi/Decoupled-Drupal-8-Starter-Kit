import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, FormGroup, Input, Label, Container, Button } from 'reactstrap';
import { Mutation, Query } from 'react-apollo';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import ARTICLE_SHAPE from '../utils/articlePropType';

import { normalizeArticleImages } from '../utils/ArticlesFormatter';
// import Gallery from './GalleryFrame';
import { MediaImageField } from './MediaImageField';

import { UPDATE_ARTICLE_MUTATION, ARTICLE_BY_NID, FETCH_ALL_ARTICLES_WITH_PERMISSIONS } from '../api/apolloProxy';


function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.imgur.com/3/image');
    xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
    const data = new FormData();
    data.append('image', file);
    xhr.send(data);
    xhr.addEventListener('load', () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response);
    });
    xhr.addEventListener('error', () => {
      const error = JSON.parse(xhr.responseText);
      reject(error);
    });
  });
}

export class EditPage extends Component {
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.article === prevState.article) {
  //     return null;
  //   }
  //   return { article: nextProps.article };
  // }

  constructor(props) {
    super(props);
    const { article } = props;

    const html = article.body.value;
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
        article,
      };
    }
  }

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };

  catchError = (error) => {
    console.log(`Error ${error}`);
  }

  updateImages = (images) => {
    const article = {
      ...this.state.article,
      images: images.map(image => ({ ...image, file: {} })),
    };
    this.setState({ article }, () => {
      // console.log(this.state.article);
      // this.saveChanges();
    });
  }

  saveChanges = async () => {
    const {
      article: {
        nid, title, images,
      },
      editorState,
    } = this.state;

    const body = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    const variables = {
      id: String(nid),
      title,
      body,
      field_media_image: images.map(item => item.mid),
    };
    try {
      await this.props.updateArticle({
        variables,
        update: (store, { data: { updateArticle: { article } } }) => {
          try {
            // Read the data from our cache for this query.
            const data = store.readQuery({
              query: ARTICLE_BY_NID,
              variables: { nid: String(article.nid) },
            });
            // replace our updated article from the mutation.
            data.article = article;
            // Write our data back to the cache.
            store.writeQuery({
              query: ARTICLE_BY_NID,
              variables: { nid: String(article.nid) },
              data,
            });
          } catch (error) {
            console.log('ARTICLE_BY_NID cache updated');
          }

          // TODO: There must be a better way...
          // update other filter queries :(
          try {
            const aData = store.readQuery({ query: FETCH_ALL_ARTICLES_WITH_PERMISSIONS });
            const index = aData.nodeQuery.entities.findIndex(item => item.nid === article.nid);
            if (index === -1) { return; }
            aData.nodeQuery.entities[index] = article;
            store.writeQuery({ query: FETCH_ALL_ARTICLES_WITH_PERMISSIONS, aData });
          } catch (error) {
            console.log('FETCH_ALL_ARTICLES_WITH_PERMISSIONS cache updated');
          }
        },
      });
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

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.saveChanges();
    }
  };

  /*
  * Render
  * ----------------------
  */

  render() {
    const { editorState } = this.state;
    const { article: { access, title, images } } = this.state;
    return (
      <div className="editPageContainer">
        { !access ?
          <div className="container"><h2 className="alert alert-danger">You do not have acess to edit this page - Please leave.</h2></div>
        : null
        }
        <Container>
          <Form>
            <FormGroup>
              <Label>Images</Label>
              <MediaImageField images={images} updateImages={this.updateImages} />
            </FormGroup>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input name="title" placeholder="Title" bsSize="lg" onChange={this.handleInputChange} value={title} onKeyPress={this.handleKeyPress} />
            </FormGroup>
            <FormGroup>
              <Label for="body">Body</Label>
              <Editor
                editorState={editorState}
                onEditorStateChange={this.onEditorStateChange}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                toolbar={{
                  options: ['blockType', 'fontSize', 'list', 'textAlign', 'link'],
                  inline: { inDropdown: false },
                  link: { inDropdown: true },
                  history: { inDropdown: false },
                  image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
                }}
              />
              {/* <Input name="body" placeholder="Body" type="textarea" bsSize="lg" onChange={this.handleInputChange} value={body} onKeyPress={this.handleKeyPress} /> */}
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
            loading: queryLoading, error: queryError, data, networkStatus,
          }) => {
            if (networkStatus === 4) return 'Refetching!';
            if (queryLoading || mutationLoading) {
              return (
                <div className="text-center">
                  <div className="loading-text h1 text-center">{queryLoading ? <p>Loading...</p> : <p>Saving...</p> }</div>
                  <div className="loader" />
                </div>);
            }
            if (queryError) return `Error!: ${queryError}`;

            const { article } = data;
            const normalizedImages = normalizeArticleImages(article);
            const normalizedArticle = { ...article, images: normalizedImages };
            return (
              <div>
                { mutationError ? <div>mutationError</div> : null }
                <EditPage article={normalizedArticle} updateArticle={updateArticle} />
              </div>
            );
          }
        }
      </Query>
    )}
  </Mutation>
);

export default withRouter(EditPageWrapper);
