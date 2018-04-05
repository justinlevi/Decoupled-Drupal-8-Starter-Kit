// import { gql } from 'apollo-boost';

export const defaults = {
  session: {
    __typename: 'Session',
    isConnected: true,
    isAuthenticated: !!localStorage.getItem('authToken'),
  },
};

export const resolvers = {
  Mutation: {
    updateNetworkStatus: (_, { isConnected }, { cache }) => {
      cache.writeData({ data: { networkStatus: { isConnected } } });
      return null;
    },
    updateAuthenticated: (_, { isAuthenticated }, { cache }) => {
      cache.writeData({ data: { session: { isAuthenticated, __typename: 'Session' } } });
      return null;
    },
  },
};
