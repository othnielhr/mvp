import React from 'react';
import ReactEntry from './RepoEntry.jsx';

const RepoList = (props) => {
  let repos = props.repos.map(repo => {
    return ( <ReactEntry key={repo._id} data={repo} />)
  });

  return (
    <div>
      <ul>{repos}</ul>
    </div>
  )
}

export default RepoList;