import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, FormGroup, Input } from 'reactstrap';

import { saveArticleUpdates } from '../redux/article/actions';
import Gallery from './GalleryFrame';
import { getArticleFromNid } from '../redux/article/utilities';

export class EditPage extends Component {
  /*
  * Constructor
  * ----------------------
  */
  constructor(props) {
    super(props);

    const { activeArticleNid, articles } = props;
    const page = getArticleFromNid(articles, activeArticleNid);
    const { title, body } = page;

    this.state = {
      saveTimeout: undefined,
      page,
      title: title === null || title === 'NULL' ? '' : title,
      body: body === null ? '' : body.value,
    };
  }

  catchError = (error) => {
    console.log(`Error ${error}`);
  }

  updateNode = () => {
    const { dispatch } = this.props;
    const { title, body, page } = this.state;

    const mids = page.images.map(item => item.mid);
    const variables = {
      id: String(page.nid),
      title: title === '' ? 'NULL' : title,
      body,
      field_media_image: mids,
    };

    dispatch(saveArticleUpdates(variables));

    // client.mutate({ mutation: updateArticleMutation, variables })
    //   .then((response) => {
    //     const msg = response.data.updateArticle.page !== null ?
    //       'SUCCESS: UPDATE ARTICLE COMPLETE' :
    //       'ERROR: The page was not updated correctly';
    //     console.log(msg);
    //   }).catch(this.catchError);
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
    const { page, title, body } = this.state;
    return (
      <div className="EditPageContainer">

        <Form>
          <FormGroup>
            <Input name="title" placeholder="Title" bsSize="lg" onChange={this.handleInputChange} value={title} />
            <Input name="body" placeholder="Body" type="textarea" bsSize="lg" onChange={this.handleInputChange} value={body} />
          </FormGroup>
        </Form>

        <Gallery page={page} />

      </div>
    );
  }
}

EditPage.propTypes = {
  // client: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  activeArticleNid: PropTypes.number.isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

// export const EditPageWrapper = withApollo(EditPage);
// export default EditPageWrapper;

const mapStateToProps = state => ({
  activeArticleNid: state.articleReducer.activeArticleNid,
  articles: state.articleReducer.articles,
});
const EditPageWrapper = connect(mapStateToProps)(EditPage);

export default EditPageWrapper;
