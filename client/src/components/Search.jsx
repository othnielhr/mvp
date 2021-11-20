import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (<div>
      Enter the pokemon card name: <input value={this.state.terms} onChange={this.onChange.bind(this)}/>
      <button onClick={this.search.bind(this)}> Search </button>
    </div>)
  }
}

export default Search;