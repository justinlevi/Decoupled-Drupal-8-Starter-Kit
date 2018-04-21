import React, { Component } from 'react';
import { node } from 'prop-types';

export class ErrorBoundary extends Component {
  state = {
    hasError: false,
  }

  componentDidCatch(error, info) {
    this.setState(state => ({ ...state, hasError: true }));
    // send to errorReporting service
    console.log(error);
    console.log(info);
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return <div>Sadly, something has gone wrong. :(</div>;
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: node.isRequired,
};

export default ErrorBoundary;
