const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cardCollector', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
.then(() => console.log('connected to db'))
.catch(err => console.log(err));

let repoSchema = mongoose.Schema({
  cardName: String,
  imgurl: {type: String, unique: true},
  price: Number,
  element: String,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = repoData => {
  // console.log('saving', repoData)
  const repo = new Repo({
    cardName: repoData.cardName,
    imgurl: repoData.imgurl,
    price: repoData.price || 0,
  });

  const update = {
    cardName: repoData.cardName,
    imgurl: repoData.imgurl,
    price: repoData.price || 0,
  };

    Repo.findOneAndUpdate({ imgurl: repoData.imgurl }, update , {upsert: true})
      .then(updated => {
        return updated;
      })
      .catch(err => {
         return err;
      })
};

let find = () => {
  return Repo.find().sort({price: -1}).limit(25).exec();
};

module.exports.save = save;
module.exports.find = find;