const LocalStorageHelper = {
  setToken: (token) => {
    localStorage.setItem('token', token);
  },

  removeToken: () => {
    localStorage.removeItem('token');
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  getCSRFToken: () => {
    return localStorage.getItem('csrf_token');
  },

  setCSRFToken: (token) => {
    localStorage.setItem('csrf_token', token);
  },

  removeCSRFToken: () => {
    localStorage.removeItem('csrf_token');
  },

  setLogoutToken: (token) => {
    localStorage.setItem('logout_token', token);
  },

  getLogoutToken: () => {
    return localStorage.getItem('logout_token');
  },

  removeLogoutToken: () => {
    localStorage.removeItem('logout_token');
  },

  getUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },

  removeUser: () => {
    localStorage.removeItem('user');
  },

  clearStorage: () => {
    localStorage.clear();
  },

  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  setTimer: (time, path) => {
    localStorage.setItem(`${path}_timer`, time);
  },

  getTimer: (path) => {
    return localStorage.getItem(`${path}_timer`);
  },

  clearTimer: (path) => {
    localStorage.removeItem(`${path}_timer`);
  },

  getTimestamp: (path) => {
    return localStorage.getItem(`${path}_stamp`);
  },
  setTimestamp: (time, path) => {
    localStorage.setItem(time, `${path}_stamp`);
  },
  clearTimestamp: (path) => {
    localStorage.removeItem(`${path}_stamp`);
  },
};

export default LocalStorageHelper;
