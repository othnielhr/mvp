const axios = require('axios');
const config = require('../config.js');

module.exports.getCardByName = (cardname, callback) => {
  let options = {
    url: `https://api.pokemontcg.io/v2/cards?q=name:${cardname}`,
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
      // console.log(err);
      callback(err);
    })
}

// module.exports.getCardByName = getCardByName;