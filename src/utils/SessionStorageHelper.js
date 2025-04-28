const SessionStorageHelper = {
  setToken: (value) => {
    sessionStorage.setItem('reset_token', value);
  },
  getToken: () => {
    const storedData = sessionStorage.getItem('reset_token');
    const queryParams = new URLSearchParams(storedData);
    const name = queryParams.get('name');
    const id = queryParams.get('id');
    const sessionTkn = queryParams.get('JN');

    return { name, id, sessionTkn };
  },
  removeToken: () => {
    sessionStorage.removeItem('reset_token');
  },
  clear: () => {
    sessionStorage.clear();
  },

  setUserDetails: (value) => {
    sessionStorage.setItem('user_details', JSON.stringify(value));
  },
  getUserDetails: () => {
    const storedData = sessionStorage.getItem('user_details');
    return storedData ? JSON.parse(storedData) : null;
  },
};

export default SessionStorageHelper;
