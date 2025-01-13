import React, { useState, useEffect } from 'react';
import Card from './Card';
import Deck from './Deck';

const Game = () => {
    const [deck, setDeck] = useState([]);
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const newDeck = Deck().createDeck();
        setDeck(newDeck);
        setPlayerHand([]);
        setDealerHand([]);
        setGameOver(false);
        setMessage('');
        dealInitialCards(newDeck);
    };

    const dealInitialCards = (deck) => {
        const playerCards = [deck.pop(), deck.pop()];
        const dealerCards = [deck.pop(), deck.pop()];

        setPlayerHand(playerCards);
        setDealerHand(dealerCards);
        setDeck(deck);
    };

    const calculateHandValue = (hand) => {
        let value = 0;
        let aces = 0;

        hand.forEach(card => {
            if (['J', 'Q', 'K'].includes(card.value)) {
                value += 10;
            } else if (card.value === 'A') {
                aces += 1;
                value += 11;
            } else {
                value += parseInt(card.value);
            }
        });

        while (value > 21 && aces) {
            value -= 10;
            aces -= 1;
        }

        return value;
    };

    const handleHit = () => {
        if (deck.length > 0) {
            const newCard = deck.pop();
            setPlayerHand(prev => [...prev, newCard]);
            setDeck(deck);
            checkForBust();
        }
    };

    const handleStand = () => {
        let dealerValue = calculateHandValue(dealerHand);
        while (dealerValue < 17) {
            const newCard = deck.pop();
            setDealerHand(prev => [...prev, newCard]);
            setDeck(deck);
            dealerValue = calculateHandValue(dealerHand);
        }
        determineWinner();
    };

    const checkForBust = () => {
        const playerValue = calculateHandValue(playerHand);
        if (playerValue > 21) {
            setMessage('Te has pasado. ¡Perdiste!');
            setGameOver(true);
        }
    };

    const determineWinner = () => {
        const playerValue = calculateHandValue(playerHand);
        const dealerValue = calculateHandValue(dealerHand);

        if (dealerValue > 21) {
            setMessage('El dealer se ha pasado. ¡Ganaste!');
        } else if (playerValue > dealerValue) {
            setMessage('¡Ganaste!');
        } else if (playerValue < dealerValue) {
            setMessage('¡Perdiste!');
        } else {
            setMessage('¡Es un empate!');
        }
        setGameOver(true);
    };

    return (
        <div>
            <h1>Blackjack</h1>
            <div>
                <h2>Tu Mano:</h2>
                {playerHand.map((card, index) => (
                    <Card key={index} card={card} />
                ))}
                <p>Valor: {calculateHandValue(playerHand)}</p>
            </div>
            <div>
                <h2>Mano del Dealer:</h2>
                {dealerHand.map((card, index) => (
                    <Card key={index} card={card} />
                ))}
                <p>Valor: {calculateHandValue(dealerHand)}</p>
            </div>
            <button onClick={handleHit} disabled={gameOver}>Pedir Carta</button>
            <button onClick={handleStand} disabled={gameOver}>Plantarse</button>
            <button onClick={initializeGame}>Reiniciar Juego</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Game;