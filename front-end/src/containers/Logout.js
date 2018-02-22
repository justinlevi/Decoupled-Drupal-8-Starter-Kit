import React from 'react';
import PropTypes from 'prop-types';

// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logout } from '../redux/auth/oauth/actions';

// class Logout extends Component {
//   static propTypes = {
//     dispatch: PropTypes.func.isRequired,
//   }

//   componentWillMount() {
//     this.props.dispatch(logout());
//   }

//   render() {
//     return (
//       <Redirect to="/" />
//     );
//   }
// }

const Logout = ({ dispatch }) => {
  dispatch(logout());
  return (
    <Redirect to="/" />
  );
};

Logout.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default Logout;

// export default connect()(Logout);
