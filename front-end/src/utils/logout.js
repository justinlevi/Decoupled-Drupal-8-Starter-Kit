import { updateAuthenticatedMutation } from '../api/apolloProxy';

export const logout = () => {
  localStorage.removeItem('authToken');
  updateAuthenticatedMutation({ isAuthenticated: false });
};

export default logout;
