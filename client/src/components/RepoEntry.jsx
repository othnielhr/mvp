import React from 'react';
import RepoList from './RepoList.jsx';

var ReactEntry = (props) => {
  let repo_name = props.data.imgurl;
  let username = props.data.cardName;
  let forks = props.data.price;

  return (
    <li>
      {/* {console.log('entry')} */}
      <span><img src={repo_name}/></span><span> {username} </span><span> (price: ${forks}) </span>
    </li>
  )
};

export default ReactEntry;