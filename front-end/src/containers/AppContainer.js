import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';

import { ApolloProvider } from 'react-apollo';

import ApolloClient from 'api/apolloClient';
import App from 'components/App';

import { tokensExpiredCheck } from '../redux/auth/oauth/actions';

export class AppContainer extends Component {
  constructor(props) {
    super(props);

    props.history.listen((location) => {
      if (props.isAuthenticated) {
        this.props.dispatch(tokensExpiredCheck());
      }
    });
  }

  componentWillMount() {
    const { dispatch, isAuthenticated } = this.props;
    if (sessionStorage.getItem('accessToken')) {
      dispatch(tokensExpiredCheck());
    }
  }

  render() {
    return (
      <Provider store={this.props.store} >
        <ApolloProvider client={ApolloClient}>
          <App
            {...this.state}
            {...this.props}
          />
        </ApolloProvider>
      </Provider>
    );
  }
}

AppContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  store: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  isLoggingIn: state.authReducer.isLoggingIn,
});

export default connect(mapStateToProps)(AppContainer);
