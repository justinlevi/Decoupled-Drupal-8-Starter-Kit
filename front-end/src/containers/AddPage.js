import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { push } from 'react-router-redux';

import { addPage } from '../redux/page/actions';

class AddPage extends Component {

  state = {
    title: {
      value: '',
      isValid: null,
    },
    body: {
      value: ''
    }
  }

  //ACTIONS EVENTS HANDLERS
  addPageHandler = (title) => {
    const { dispatch } = this.props;
    dispatch(addPage({ title: title }));
  }

  onSubmitClick = (e) => {
    e.preventDefault();

    if(this.state.title.value){
      this.addPageHandler(this.state.title.value);
      
      if(this.props.addPageStatus === 'success'){
        this.props.dispatch(push('/list'));
      }else if(this.props.addPageStatus === 'failed'){
        console.log("FAILED");
      }

    }else{
      this.setState({
        title: {
          ...this.state.title,
          isValid: false
        }
      })
    }

  }

  onInputChange = (e) => {
   let name = e.target.name;
   let value = e.target.value;

   this.setState({
     [name]: {
       ...[name],
       value: value
     }
   });

  }

  inputValidCheck = () =>{

    if(this.state.title.isValid === false){
      return "invalid";
    }else if(this.state.title.isValid === true){
      return "valid";
    }else{
      return "required";
    }

  }

  render () {
    return(
      <div className="AddPageContainer">

        <Form>
          <FormGroup>
            <Input name="title" placeholder="Title (required)" bsSize="lg" className={this.inputValidCheck()} onChange={this.onInputChange} value={this.state.title.value} />
            <Input name="body" placeholder="Body" type="textarea" bsSize="lg"  value={this.state.body.value} />
            <Button name="addpage" className="addpage-submit" onClick={this.onSubmitClick} type="submit">Add Page</Button>
          </FormGroup>
        </Form>

      </div>
    )
  }

}

AddPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  addPageStatus: PropTypes.string
}

const mapStateToProps = state => ({
  addPageStatus: state.pageReducer.addPageStatus,
});

export default connect(mapStateToProps)(AddPage);
