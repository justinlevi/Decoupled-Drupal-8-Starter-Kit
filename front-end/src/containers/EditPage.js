import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { Form, FormGroup, Input } from 'reactstrap';

import { updatePageMutation } from 'api/queries';

import * as GalleryFrame from 'containers/GalleryFrame';


export class EditPage extends Component {
  /*
  * Constructor
  * ----------------------
  */
  constructor(props) {
    super(props);

    this.state = {
      saveTimeout: undefined,
      title: props.activeNode.title === null || props.activeNode.title === 'NULL' ? '' : props.activeNode.title,
      body: props.activeNode.body === null ? '' : props.activeNode.body.value,
    };
  }

  catchError = (error) => {
    console.log(`Error ${error}`);
  }

  updateNode = () => {
    const { client, activeNode } = this.props;
    const activeMids = activeNode.images.map(item => item.mid);
    const variables = {
      id: Number(activeNode.nid),
      title: this.state.title === '' ? 'NULL' : this.state.title,
      body: this.state.body,
      field_media_image: activeMids,
    };

    client.mutate({ mutation: updatePageMutation, variables })
      .then((response) => {
        const msg = response.data.updatePage.page !== null ?
          'SUCCESS: UPDATE PAGE COMPLETE' :
          'ERROR: The page was not updated correctly';
        console.log(msg);
      }).catch(this.catchError);
  }

  handleInputChange = ({
    target, name, type,
  }) => {
    const nValue = type === 'checkbox' ? target.checked : target.value;
    if (this.state.saveTimeout) {
      clearTimeout(this.state.saveTimeout);
    }

    this.setState({
      [name]: nValue,
      saveTimeout: window.setTimeout(() => { this.updateNode(); }, 2000),
    });
  }

  /*
  * Render
  * ----------------------
  */

  render() {
    const { activeNode } = this.props;
    return (
      <div className="EditPageContainer">

        <Form>
          <FormGroup>
            <Input name="title" placeholder="Title" bsSize="lg" onChange={this.handleInputChange} value={this.state.title} />
            <Input name="body" placeholder="Body" type="textarea" bsSize="lg" onChange={this.handleInputChange} value={this.state.body} />
          </FormGroup>
        </Form>

        <GalleryFrame activeNode={activeNode} />

      </div>
    );
  }
}

EditPage.propTypes = {
  client: PropTypes.func.isRequired,
  activeNode: PropTypes.object.isRequired,
};

export const EditPageWrapper = withApollo(EditPage);
export default EditPageWrapper;
