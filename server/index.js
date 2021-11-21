const express = require('express');
let app = express();

const bodyParser = require('body-parser');
const cardGetter = require('../helpers/github.js');
const insertToDb = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/cards', function (req, res) {
  let cardname = req.body.term;
  // console.log('got here', cardname);
  cardGetter.getCardByName(cardname, (resData) => {
    console.log('res data', resData[0]);
    resData.forEach((card) => {
      // console.log('card', card)
      if (card.cardmarket === undefined) {
        return;
      }
      let cardObj = {cardName: card.name, price: card.cardmarket.prices.averageSellPrice || 0, imgurl: card.images.small};
      insertToDb.save(cardObj);
    });
    // let cardObj = {cardName: resData.name, price: resData.cardmarket.prices.averageSellPrice, imgurl: resData.images.small};
    // insertToDb.save(cardObj);
    res.sendStatus(201);
  })
});

app.get('/cards', function (req, res) {
  insertToDb.find()
  .then(cards => {
    res.send(cards);
  })
  .catch(err => {
    console.log('err get', err);
    res.sendStatus(500);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});