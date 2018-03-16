import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const localStorageGetItem = jest.fn();
localStorageGetItem
  .mockReturnValueOnce(JSON.stringify({ Hey: 'Ho' }))
  .mockReturnValueOnce(null);

const localStorageMock = {
  getItem: localStorageGetItem,
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
};
// localStorageMock.getItem.mockReturnValue(JSON.stringify({ Hey: 'Ho' }));
global.localStorage = localStorageMock;

const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
};
sessionStorageMock.getItem.mockReturnValue('asdf');
global.sessionStorage = sessionStorageMock;

