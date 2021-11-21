const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cardCollector', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
.then(() => console.log('connected to db'))
.catch(err => console.log(err));

let cardSchema = mongoose.Schema({
  cardName: String,
  imgurl: {type: String, unique: true},
  price: Number,
  element: String,
});

let Cards = mongoose.model('Cards', cardSchema);

let save = cardData => {
  // console.log('saving', cardData)
  const card = new Cards({
    cardName: cardData.cardName,
    imgurl: cardData.imgurl,
    price: cardData.price || 0,
  });

  const update = {
    cardName: cardData.cardName,
    imgurl: cardData.imgurl,
    price: cardData.price || 0,
  };

    Cards.findOneAndUpdate({ imgurl: cardData.imgurl }, update , {upsert: true})
      .then(updated => {
        return updated;
      })
      .catch(err => {
         return err;
      })
};

let find = () => {
  return Cards.find().sort({price: -1}).limit(25).exec();
};

module.exports.save = save;
module.exports.find = find;