export const loadState = () => {
  let serializedState = {};
  try {
    serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
  } catch (e) {
    return undefined;
  }
  return JSON.parse(serializedState);
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.log(e);
  }
};


export default {
  loadState,
  saveState,
};
