import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { Form, FormGroup, Input } from 'reactstrap';

// import { updatePageMutation } from 'api/apolloProxy';
import { editPage } from '../redux/page/actions';
import { GalleryFrame } from './GalleryFrame';


export class EditPage extends Component {
  /*
  * Constructor
  * ----------------------
  */
  constructor(props) {
    super(props);

    const { title, body } = props.activePage;

    this.state = {
      saveTimeout: undefined,
      title: title === null || title === 'NULL' ? '' : title,
      body: body === null ? '' : body.value,
    };
  }

  catchError = (error) => {
    console.log(`Error ${error}`);
  }

  updateNode = () => {
    const { dispatch, activePage } = this.props;
    const activeMids = activePage.images.map(item => item.mid);
    const variables = {
      id: Number(activePage.nid),
      title: this.state.title === '' ? 'NULL' : this.state.title,
      body: this.state.body,
      field_media_image: activeMids,
    };

    dispatch(editPage({ ...variables }));

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
    const { activePage } = this.props;
    return (
      <div className="EditPageContainer">

        <Form>
          <FormGroup>
            <Input name="title" placeholder="Title" bsSize="lg" onChange={this.handleInputChange} value={this.state.title} />
            <Input name="body" placeholder="Body" type="textarea" bsSize="lg" onChange={this.handleInputChange} value={this.state.body} />
          </FormGroup>
        </Form>

        <GalleryFrame activePage={activePage} />

      </div>
    );
  }
}

EditPage.propTypes = {
  // client: PropTypes.func.isRequired,
  activePage: PropTypes.shape({}).isRequired,
};

// export const EditPageWrapper = withApollo(EditPage);
// export default EditPageWrapper;

const mapStateToProps = state => ({
  activePage: state.pageReducer.activePage,
});
const EditPageWrapper = connect(mapStateToProps)(EditPage);

export default EditPageWrapper;
