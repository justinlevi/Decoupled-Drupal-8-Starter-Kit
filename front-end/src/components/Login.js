import React from 'react';
import PropTypes from 'prop-types';


import '../styles/signin.css';

const Login = (props) => {
  const {
    handleLogin, handleInputChange, error,
  } = props;
  return (
    <div className="signin-container">
      <div className="text-center">
        <form className="form-signin" onSubmit={handleLogin}>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <input
            className="form-control username"
            name="username"
            type="username"
            placeholder="Username"
            onChange={handleInputChange}
          />
          <input
            className="form-control password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
          {/* <div className="checkbox mb-3">
            <input type="checkbox" value="remember-me" /> Remember me
          </div> */}
          <button className="btn btn-lg btn-primary btn-block submit" type="submit">Sign in</button>
        </form>
        { error ? <p className="error" style={{ color: 'red', display: 'block' }}>{error}</p> : null }
      </div>
    </div>
  );
};

Login.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  error: PropTypes.string,
};

Login.defaultProps = {
  error: undefined,
};

export default Login;
