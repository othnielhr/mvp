const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (user, callback) => {
  let options = {
    url: `https://api.pokemontcg.io/v2/cards?q=name:${user}`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  axios(options)
    .then(function (res) {
      // console.log('here', res.data.data)
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    })
}

module.exports.getReposByUsername = getReposByUsername;