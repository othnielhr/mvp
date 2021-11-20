const express = require('express');
let app = express();

const bodyParser = require('body-parser');
const getReposByUsername = require('../helpers/github.js').getReposByUsername;
const insertToDb = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  // console.log('req body', req.body);
  let username = req.body.term;
  // console.log(username);
  // use axios to send a get request to github api
  getReposByUsername(username, (resData) => {
    // console.log('res data', resData);
    // let data = JSON.parse(resData);
    resData.forEach((repo) => {
      let repoObj = {forks: repo.forks, username: repo.owner.login, url: repo.html_url, repo: repo.name }
      // console.log(repoObj);
      insertToDb.save(repoObj);
    });
    res.sendStatus(201);
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  // console.log('req', req);
  insertToDb.find()
  .then(repos => {
    res.send(repos);
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

//demo and approved by Mackenzie
//BMR reached