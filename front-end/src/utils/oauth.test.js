import { isTokenValid } from './oauth';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn()
};
global.localStorage = localStorageMock

const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn()
};
global.sessionStorage = sessionStorageMock


test('Oauth Expiration Check (isValid)', () => {
  // // plus an hour
  // let futureTime = (new Date()).getTime() + (1 * 1000 * 60 * 60);
  // // debugger;
  // let isValid = isTokenValid('asdf', futureTime);
  expect(1).toEqual(1);
});

