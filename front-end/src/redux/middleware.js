import { isRSAA, apiMiddleware } from 'redux-api-middleware';

import { TOKEN_RECEIVED, refreshAccessToken } from './auth/actions';
import { refreshToken, isAccessTokenExpired } from './auth/reducers';


export function createApiMiddleware() {
  let postponedRSAAs = [];

  return ({ dispatch, getState }) => {
    const rsaaMiddleware = apiMiddleware({ dispatch, getState });

    return next => (action) => {
      const nextCheckPostoned = (nextAction) => {
        // Run postponed actions after token refresh
        if (nextAction.type === TOKEN_RECEIVED) {
          next(nextAction);
          postponedRSAAs.forEach((postponed) => {
            rsaaMiddleware(next)(postponed);
          });
          postponedRSAAs = [];
        } else {
          next(nextAction);
        }
      };

      if (isRSAA(action)) {
        const state = getState();
        const token = refreshToken(state);

        if (token && isAccessTokenExpired(state)) {
          postponedRSAAs.push(action);
          return (postponedRSAAs.length === 1) ?
            rsaaMiddleware(nextCheckPostoned)(refreshAccessToken(token)) :
            null;
        }

        return rsaaMiddleware(next)(action);
      }
      return next(action);
    };
  };
}

export default createApiMiddleware();
