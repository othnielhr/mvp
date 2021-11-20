import React from 'react';
import RepoList from './RepoList.jsx';

var ReactEntry = (props) => {
  let repo_name = props.data.repo;
  let username = props.data.username;
  let forks = props.data.forks;
  let url = props.data.url;

  return (
    <li>
      {/* {console.log('entry')} */}
      <span><a href={url}>{repo_name}</a> by </span><span> {username} </span><span> ({forks} forks) </span>
    </li>
  )
};

export default ReactEntry;