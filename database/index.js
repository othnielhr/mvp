const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
.then(() => console.log('connected to db'))
.catch(err => console.log(err));

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  // id: Number, // add your own unique id {unique: true}
  username: String, //data.owner.login
  repo: String, // data.name
  url: {type: String, unique: true}, // data.html_url changed this key to be unique instead because some users may have same repo names but full url should be different
  forks: Number // data.forks
});

// create Repo model
let Repo = mongoose.model('Repo', repoSchema);

let save = repoData => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  // db.collection.save({})
  // db.Repo.save(repoData);

  const repo = new Repo({
    username: repoData.username,
    url: repoData.url,
    forks: repoData.forks,
    repo: repoData.repo
  });

  const update = {
    username: repoData.username,
    url: repoData.url,
    forks: repoData.forks,
    repo: repoData.repo
  };

  // console.log('data', repoData, 'format', repo);
  //findOneAndUpdate(filter, update, options)
  // return Promise.all(
    Repo.findOneAndUpdate({ url: repoData.url }, update , {upsert: true})
      .then(updated => {
        // console.log('updated');
        return updated;
      })
      .catch(err => { console.log('err'); })
  // );

  // repo.save(function(err, data) {
  //   if(err) {
  //     // err sent when a duplicate repo url is found
  //     console.log('error dupe', repo);
  //     // repo.update({url: repoData.url}, repo, {upsert: true});
  //   } else {
  //     console.log('saved');
  //   }
  // });
};

let find = () => {
  return Repo.find().sort({forks: -1}).limit(25).exec();
};

module.exports.save = save;
module.exports.find = find;