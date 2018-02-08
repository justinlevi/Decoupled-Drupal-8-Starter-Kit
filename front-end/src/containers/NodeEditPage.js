import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { Form, FormGroup, Input } from 'reactstrap'

import { updatePageMutation } from 'api/queries';

import GalleryFrame from "containers/GalleryFrame";


export class NodeEditPage extends Component {

  static propTypes = {
    activeNode: PropTypes.object.isRequired
  }

  /*
  * Constructor
  * ----------------------
  */
  constructor(props){
    super(props);

    this.state = {
      saveTimeout: undefined,
      title: props.activeNode.title ,
      body: props.activeNode.body === null ? '' : props.activeNode.body.value,
    };
  }

  catchError = (error) => {
    console.log('Error ' + error);
  }

  updateNode = () => {
    const activeMids = this.props.activeNode.images.map((item) => { return item.mid })
    const variables = {
      id: Number(this.props.activeNode.nid), 
      title: this.state.title,
      body: this.state.body,
      field_media_image: activeMids
    };

    this.props.client.mutate({ mutation: updatePageMutation, variables: variables})
    .then(response => {
      const msg = response.data.updatePage.page !== null ? 
        'SUCCESS: UPDATE PAGE COMPLETE' : 
        "ERROR: The page was not updated correctly";
      console.log(msg);
    }).catch(this.catchError);
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if(this.state.saveTimeout) {
      clearTimeout(this.state.saveTimeout);
    }

    this.setState({
      [name]: value,
      saveTimeout: window.setTimeout( () => { this.updateNode() }, 2000)
    });
  }

  /*
  * Render
  * ----------------------
  */

  render() {
    return (
      <div className="NodeEditPageContainer">

        <Form>
          <FormGroup>
            <Input name="title" placeholder="Title" bsSize="lg" onChange={this.handleInputChange} value={this.state.title} />
            <Input name="body" placeholder="Body" type="textarea"  bsSize="lg" onChange={this.handleInputChange} value={this.state.body} />
          </FormGroup>
        </Form>

        <GalleryFrame activeNode={this.props.activeNode} />

      </div>
    )
  }
}

export const NodeEditPageWrapper = withApollo(NodeEditPage);
export default NodeEditPageWrapper; 
