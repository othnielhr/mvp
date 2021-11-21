const express = require('express');
let app = express();

const bodyParser = require('body-parser');
const getCard = require('../helpers/github.js').getCard;
const insertToDb = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  let cardname = req.body.term;
  getCard(cardname, (resData) => {
    // console.log('res data', resData[0]);
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

app.get('/repos', function (req, res) {
  insertToDb.find()
  .then(cards => {
    res.send(cards);
  })
  .catch(err => {
    console.log('err', err);
    res.sendStatus(500);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});