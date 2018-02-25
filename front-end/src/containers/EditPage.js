import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, FormGroup, Input } from 'reactstrap';

import { savePageUpdates } from '../redux/page/actions';
import Gallery from './GalleryFrame';
import { getPageFromNid } from '../redux/page/utilities';

export class EditPage extends Component {
  /*
  * Constructor
  * ----------------------
  */
  constructor(props) {
    super(props);

    const { activePageNid, pages } = props;
    const page = getPageFromNid(pages, activePageNid);
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

    const activeMids = page.images.map(item => item.mid);
    const variables = {
      id: Number(page.nid),
      title: title === '' ? 'NULL' : title,
      body,
      field_media_image: activeMids,
    };

    dispatch(savePageUpdates(variables));

    // client.mutate({ mutation: updatePageMutation, variables })
    //   .then((response) => {
    //     const msg = response.data.updatePage.page !== null ?
    //       'SUCCESS: UPDATE PAGE COMPLETE' :
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
  activePageNid: PropTypes.number.isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

// export const EditPageWrapper = withApollo(EditPage);
// export default EditPageWrapper;

const mapStateToProps = state => ({
  activePageNid: state.pageReducer.activePageNid,
  pages: state.pageReducer.pages,
});
const EditPageWrapper = connect(mapStateToProps)(EditPage);

export default EditPageWrapper;
