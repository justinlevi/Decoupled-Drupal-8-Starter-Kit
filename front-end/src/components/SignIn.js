import React from 'react'; 
import PropTypes from 'prop-types';

import 'styles/signin.css';

const signIn = props => {
  return (
    <div className="signin-container">    
      <div className="text-center">
        <form className="form-signin" onSubmit={ props.handleLogin }>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <input className="form-control" name="username" type='username' placeholder='Username' onChange={ props.handleInputChange } />
          <input className="form-control" name="password" type='password' placeholder='Password' onChange={ props.handleInputChange } />
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
        <p style={{color: 'red', display: props.isLoginFailed ? 'block' : 'none'}}> Credentials incorrect</p>
      </div>
    </div>
  );
}

signIn.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  isLoginFailed: PropTypes.bool.isRequired
}

export default signIn;