import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './routes/PrivateRoute';
import Logout from './routes/Logout';

import PageTemplate from './containers/PageTemplate';
import Login from './containers/LoginPage';
import Home from './containers/HomePage';
import List from './containers/ListPage';
import Edit from './containers/EditPage';

const App = () =>
  (
    <Router>
      <Switch>
        <PageTemplate >
          <Route path="/" exact component={Home} />
          <Route path="/list" exact component={List} />
          <PrivateRoute path="/edit" component={Edit} />
          <Route path="/login" exact component={Login} />
          <Route path="/logout" exact component={Logout()} />
        </PageTemplate>
      </Switch>
    </Router>
  );

export default App;
