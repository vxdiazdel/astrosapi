const axios = require('axios');

module.exports.getApi = (url) => {
  return axios.get(url);
};
