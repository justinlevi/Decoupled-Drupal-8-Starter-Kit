// import { gql } from 'apollo-boost';
export const defaults = {
  networkStatus: {
    __typename: 'NetworkStatus',
    isConnected: true,
  },
  authenticated: {
    __typename: 'Authenticated',
    isAuthenticated: !!localStorage.getItem('authToken'),
  },
};

console.log(defaults);

export const resolvers = {
  Mutation: {
    updateNetworkStatus: (_, { isConnected }, { cache }) => {
      cache.writeData({ data: { networkStatus: { isConnected } } });
      return null;
    },
    updateAuthenticated: (_, {isAuthenticated}, { cache }) => {
      const data = {
        isAuthenticated: isAuthenticated,
        __typename: 'Authenticated'
      }
      cache.writeData({ data: { authenticated:  data} });
      return null;
    },
  },
};
