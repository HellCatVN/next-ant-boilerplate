const axios = require('axios');
import { userLogOut } from 'reducers/user';

axios.defaults.withCredentials = true;

module.exports = (store) => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401) {
        store.dispatch(userLogOut());
      }
      return Promise.reject(error);
    }
  );
};
