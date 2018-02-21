import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../redux/rootActions';

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleInputChange = ({ target }) => {
    const { type, name } = target;
    const nValue = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: nValue,
    });
  }

  login = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(actions.loginRequest({
      username: this.state.username,
      password: this.state.password,
    }));
  }

  render() {
    const { isLoggingIn, isAuthenticated, error } = this.props;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }

    if (isLoggingIn) {
      return <div>Logging in...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div className="col-xs-12 col-md-6 col-md-offset-3">
        <h3>Log in to view protected content!</h3>

        {this.props.error ? <div className="alert alert-info">{this.props.error}</div> : ''}
        <form>
          <div className="form-group">
            <input
              type="text"
              name="username"
              value={this.state.username}
              className="form-control input-lg"
              onChange={this.handleInputChange}
              placeholder="Username"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={this.state.password}
              className="form-control input-lg"
              onChange={this.handleInputChange}
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-lg"
            disabled={this.props.isLoggingIn}
            onClick={this.login}
          >Submit
          </button>
        </form>
      </div>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoggingIn: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

LoginPage.defaultProps = {
  error: '',
};

const mapStateToProps = state => ({
  isLoggingIn: state.oauth.isLoggingIn,
  isAuthenticated: state.oauth.isAuthenticated,
  error: state.oauth.error,
});

export default connect(mapStateToProps)(LoginPage);
