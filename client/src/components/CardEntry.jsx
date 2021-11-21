import React from 'react';
import CardList from './CardList.jsx';

var ReactEntry = (props) => {
  let card_name = props.data.imgurl;
  let cardname = props.data.cardName;
  let prices = props.data.price;

  return (
    <li>
      <span><img src={card_name}/></span><span> {cardname} </span><span> (price: ${prices})</span>
    </li>
  )
};

export default ReactEntry;