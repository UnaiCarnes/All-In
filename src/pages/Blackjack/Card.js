import React from 'react';

const Card = ({ card }) => {
    return (
        <div className="card">
            {card.value} of {card.suit}
        </div>
    );
};

export default Card;