import React, {useState} from "react";
 
const Card = ({deck}) => {
    const imageUrl = deck && deck.cards.length > 0 ? deck.cards[0].image : '';

    return (
      <div>
        {/* Render the image */}
        <img src={imageUrl} alt="Card" />
      </div>
    );
};

export default Card;