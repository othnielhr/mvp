const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (user, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  // use axios.get or like ajax

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  // console.log('passed in username: ', user);
  let options = {
    url: `http://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  // console.log(options);
  axios(options)
    .then(function (res) {
      // console.log(res);
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    })
}

module.exports.getReposByUsername = getReposByUsername;