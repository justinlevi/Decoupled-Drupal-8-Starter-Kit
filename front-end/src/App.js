import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Query } from 'react-apollo';

import { ErrorBoundary } from './utils/ErrorBoundary';
import PrivateRoute from './routes/PrivateRoute';
import Logout from './routes/Logout';

import PageTemplate from './containers/PageTemplate';
import Login from './containers/LoginPage';
import Home from './containers/HomePage';
import List from './containers/ListPage';
import Edit from './containers/EditPage';
import ContentDetailsPage from './containers/ContentDetailsPage';

import { SESSION_QUERY } from './api/apolloProxy';
// import { defaults as defaultSession } from './api/resolvers';

export const {
  Provider: SessionProvider,
  Consumer: SessionConsumer,
} = React.createContext();

const App = () =>
  (
    <ErrorBoundary>
      <Query query={SESSION_QUERY} notifyOnNetworkStatusChange>
        {
          ({
            loading, error, data, networkStatus,
          }) => {
            // console.log(`networkStatus: ${networkStatus}`);
            if (networkStatus === 4) return 'Refetching!';
            if (networkStatus === 8) return 'NETWORK ERROR!';
            if (loading) return 'Loading!';
            if (error) return `Error!: ${error}`;

            return (
              <SessionProvider value={{ ...data.session }}>
                <Router>
                  <Switch>
                    <PageTemplate>
                      <Route path="/" exact component={Home} />
                      <Route path="/articles/:path" exact component={ContentDetailsPage} />
                      <Route path="/list" exact component={List} />
                      <PrivateRoute path="/edit" component={Edit} />
                      <Route path="/login" exact component={Login} />
                      <Route path="/logout" exact component={Logout()} />
                    </PageTemplate>
                  </Switch>
                </Router>
              </SessionProvider>
            );
          }
        }
      </Query>
    </ErrorBoundary>
  );

export default App;
