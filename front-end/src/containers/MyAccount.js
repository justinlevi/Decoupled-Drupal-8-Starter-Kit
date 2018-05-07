import React, { Component } from 'react';

import { SessionConsumer } from '../App';

import Profile from '../components/Profile';
import MyStats from '../components/MyStats';
import MyContent from '../components/MyContent';

// import {  } from '../api/apolloProxy';

export class MyAccount extends Component {
  state = {
  };

  render() {
    const { props, state } = this;
    const profile = {};
    const stats = {};
    const items = {};

    return (
      <SessionConsumer>
        {session => (
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-6 col-lg-4">
                <Profile {...profile} {...session} />
              </div>
              <div className="col-sm-12 col-md-6 col-lg-8">
                <MyStats {...stats} />
                <MyContent {...items} />
              </div>
            </div>
          </div>
        )}
      </SessionConsumer>
    );
  }
}

export default MyAccount;
