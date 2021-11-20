import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import List from './components/List.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };
    this.search = this.search.bind(this);
    this.renderRepos = this.renderRepos.bind(this);

  }

  componentDidMount() {
    this.renderRepos();
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    // send a POST request using jquery ajax to the server /repos
    $.ajax({
      type: 'POST',
      url: 'http://localhost:1128/repos',
      contentType: 'application/json',
      data: JSON.stringify({term}),
      success: function(data) {
        console.log('success', data);
      }
    })
    .then((res) => {
      this.renderRepos();
    })
    .catch((err) => {
      console.log('err');
    })
  }

  renderRepos() {
    // console.log('rendering');
    return axios.get('/repos').then( ({data}) => {
      this.setState({ repos: data });
    });
  }

  render () {
    return (<div>
      <h1>Pokemon Card Price Tracker</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));