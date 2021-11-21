import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import CardList from './components/CardList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
    this.search = this.search.bind(this);
    this.renderCards = this.renderCards.bind(this);

  }

  componentDidMount() {
    this.renderCards();
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      type: 'POST',
      url: 'http://localhost:1128/cards',
      contentType: 'application/json',
      data: JSON.stringify({term}),
      success: function(data) {
        console.log('success', data);
      }
    })
    .then((res) => {
      this.renderCards();
    })
    .catch((err) => {
      console.log('err');
    })
  }

  renderCards() {
    // console.log('rendering');
    return axios.get('/cards').then( ({data}) => {
      this.setState({ cards: data });
    });
  }

  render () {
    return (<div>
      <h1>Pokemon Card Price Tracker</h1>
      <CardList cards={this.state.cards}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));