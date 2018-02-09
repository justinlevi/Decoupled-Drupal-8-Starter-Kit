import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { connect } from 'react-redux';

import SignIn from 'components/SignIn';
import Navbar from 'components/Navbar';

import CardListPage from 'containers/CardListPage';
import NodeEditPage from 'containers/NodeEditPage';

import ApolloClient from 'api/apolloClient';

export class App extends Component {

  static propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
  }

  renderLoading = () => {
    return (
      <div>Loading...</div>
    );
  }

  renderAuthenticated = () => {

    const { handleLogout, activeNode } = this.props;

    return (
      <div>
          <div className="container authenticated">
              <Navbar handleLogout={handleLogout} />
              {
                !this.props.activeNode ?
                  <CardListPage projectCardListHandler={this.props.projectCardListHandler}/>
                :
                  <NodeEditPage activeNode={activeNode} />
              }
          </div>
      </div>

    );
  }

  renderAnonymous = () => {
    const { handleInputChange, handleLogin, isLoginFailed } = this.props;
    return <SignIn handleInputChange={ handleInputChange } handleLogin={ handleLogin } isLoginFailed={ isLoginFailed } />;
  }

  renderError = () => {
    return (
      <div>Sadly, there seems to have been an error. Contact someone super important to help facilitate forward progress.</div>
    )
  }

  render() {
    if (this.props.isLoading) {
      return this.renderLoading();
    } else if (this.props.authenticated){
      return this.renderAuthenticated();
    } else if (!this.props.authenticated && !this.props.isLoading) {
      return this.renderAnonymous();
    } else {
      return this.renderError();
    }
  }

}

const AppWrapper = (props) => {
    return (
      <ApolloProvider client={ApolloClient}>
        <App {...props} />
      </ApolloProvider>
    );
}

AppWrapper.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  authenticated: state.oauth.authenticated
})

export default connect(mapStateToProps)(AppWrapper);
