import React from 'react';
import ReactEntry from './CardEntry.jsx';

const CardList = (props) => {
  let cards = props.cards.map(card => {
    return ( <ReactEntry key={card._id} data={card} />)
  });

  return (
    <div>
      <ul>{cards}</ul>
    </div>
  )
}

export default CardList;