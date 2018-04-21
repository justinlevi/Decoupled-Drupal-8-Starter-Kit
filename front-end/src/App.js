import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ErrorBoundary } from './utils/ErrorBoundary';
import PrivateRoute from './routes/PrivateRoute';
import Logout from './routes/Logout';

import PageTemplate from './containers/PageTemplate';
import Login from './containers/LoginPage';
import Home from './containers/HomePage';
import List from './containers/ListPage';
import Edit from './containers/EditPage';
import ContentDetailsPage from './containers/ContentDetailsPage';

const App = () =>
  (
    <Router>
      <Switch>
        <PageTemplate >
          <ErrorBoundary>
            <Route path="/" exact component={Home} />
            <Route path="/articles/:path" exact component={ContentDetailsPage} />
            <Route path="/list" exact component={List} />
            <PrivateRoute path="/edit" component={Edit} />
            <Route path="/login" exact component={Login} />
            <Route path="/logout" exact component={Logout()} />
          </ErrorBoundary>
        </PageTemplate>
      </Switch>
    </Router>
  );

export default App;
