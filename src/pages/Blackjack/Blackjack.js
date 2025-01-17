import React, { useState, useEffect } from 'react';
import Status from './Status';
import Controls from './Controls';
import Hand from './Hand';
import { useTranslation } from 'react-i18next';
import jsonData from './deck.json';
import axios from '../../utils/axios';

const Blackjack = () => {

  const { t } = useTranslation();

  const GameState = {
    bet: 'bet',
    init: 'init',
    userTurn: 'userTurn',
    dealerTurn: 'dealerTurn'
  };

  const Deal = {
    user: 'user',
    dealer: 'dealer',
    hidden: 'hidden'
  };

  const Message = {
    bet: t('BLACKJACK.¡Haz una apuesta!'),
    hitStand: t('BLACKJACK.¿Pedir o plantarse?'),
    bust: t('BLACKJACK.¡Te has pasado!'),
    userWin: t('BLACKJACK.¡Has ganado!'),
    dealerWin: t('BLACKJACK.¡El crupier gana!'),
    tie: t('BLACKJACK.¡Empate!')
  };
  const data = JSON.parse(JSON.stringify(jsonData.cards));
  const [deck, setDeck] = useState(data);

  const [userCards, setUserCards] = useState([]);
  const [userScore, setUserScore] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const [dealerCards, setDealerCards] = useState([]);
  const [dealerScore, setDealerScore] = useState(0);
  const [dealerCount, setDealerCount] = useState(0);

  const [balance, setBalance] = useState(100);
  const [bet, setBet] = useState(0);

  const [gameState, setGameState] = useState(GameState.bet);
  const [message, setMessage] = useState(Message.bet);
  const [buttonState, setButtonState] = useState({
    hitDisabled: true,
    standDisabled: true,
    resetDisabled: true
  });

  const [statusKey, setStatusKey] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);

  const drawCard = (dealType) => {
    if (deck.length > 0) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      const card = deck[randomIndex];
      deck.splice(randomIndex, 1);
      setDeck([...deck]);
      switch (card.suit) {
        case 'spades':
          dealCard(dealType, card.value, '♠');
          break;
        case 'diamonds':
          dealCard(dealType, card.value, '♦');
          break;
        case 'clubs':
          dealCard(dealType, card.value, '♣');
          break;
        case 'hearts':
          dealCard(dealType, card.value, '♥');
          break;
        default:
          break;
      }
    } else {
      alert('All cards have been drawn');
    }
  };

  useEffect(() => {
    const fetchBalance = async () => {
      const response = await axios.get('/profile');
      setBalance(response.data.userInfo.balance);
    };

    fetchBalance();
  }, []);

  useEffect(() => {
    if (gameState === GameState.init) {
        drawCard(Deal.user);
        drawCard(Deal.hidden);
        drawCard(Deal.user);
        drawCard(Deal.dealer);
        setGameState(GameState.userTurn);
        setMessage(Message.hitStand);
        setButtonState({ hitDisabled: false, standDisabled: false, resetDisabled: true }); 
    }
  }, [gameState, Deal.user, Deal.hidden, Deal.dealer, GameState.userTurn, Message.hitStand, drawCard]);

  useEffect(() => {
    calculate(userCards, setUserScore);
    if (userScore === 21) {
        setMessage(Message.userWin);
        setButtonState({ hitDisabled: true, standDisabled: true, resetDisabled: false });
    } else if (userScore > 21) {
        bust();
    }
  }, [userCards, userScore, Message.userWin]);

  useEffect(() => {
    calculate(userCards, setUserScore);
    setUserCount(userCount + 1);
  }, [userCards]);

  useEffect(() => {
    calculate(dealerCards, setDealerScore);
    setDealerCount(dealerCount + 1);
  }, [dealerCards]);

  useEffect(() => {
    if (gameState === GameState.userTurn) {
      if (userScore === 21) {
        buttonState.hitDisabled = true;
        setButtonState({ ...buttonState });
      } else if (userScore > 21) {
        bust();
      }
    }
  }, [userCount]);

  useEffect(() => {
    if (gameState === GameState.dealerTurn) {
      if (dealerScore >= 17) {
        checkWin();
      } else {
        drawCard(Deal.dealer);
      }
    }
  }, [dealerCount]);

  const resetGame = () => {
    console.clear();
    setDeck(data);

    setUserCards([]);
    setUserScore(0);
    setUserCount(0);

    setDealerCards([]);
    setDealerScore(0);
    setDealerCount(0);

    setBet(0);

    setGameState(GameState.bet);
    setMessage(Message.bet);
    setButtonState({
      hitDisabled: true,
      standDisabled: true,
      resetDisabled: true
    });
    setStatusKey(prevKey => prevKey + 1);
  };

  const placeBet = (amount) => {
    setBet(amount);
    setBalance(Math.round((balance - amount) * 100) / 100);
    setGameState(GameState.init);
  };

  const dealCard = (dealType, value, suit) => {
    switch (dealType) {
      case Deal.user:
        userCards.push({ value, suit, hidden: false });
        setUserCards([...userCards]);
        break;
      case Deal.dealer:
        dealerCards.push({ value, suit, hidden: false });
        setDealerCards([...dealerCards]);
        break;
      case Deal.hidden:
        dealerCards.push({ value, suit, hidden: true });
        setDealerCards([...dealerCards]);
        break;
      default:
        break;
    }
  };

  const revealCard = () => {
    dealerCards.filter((card) => {
      if (card.hidden === true) {
        card.hidden = false;
      }
      return card;
    });
    setDealerCards([...dealerCards]);
  };

  const calculate = (cards, setScore) => {
    let total = 0;
    cards.forEach((card) => {
      if (card.hidden === false && card.value !== 'A') {
        switch (card.value) {
          case 'K':
          case 'Q':
          case 'J':
            total += 10;
            break;
          default:
            total += Number(card.value);
            break;
        }
      }
    });
    const aces = cards.filter((card) => card.value === 'A');
    aces.forEach((card) => {
      if (card.hidden === false) {
        if (total + 11 > 21) {
          total += 1;
        } else if (total + 11 === 21 && aces.length > 1) {
          total += 1;
        } else {
          total += 11;
        }
      }
    });
    setScore(total);
  };
  
  const hit = () => {
    drawCard(Deal.user);
  };

  const stand = () => {
    setButtonState({ hitDisabled: true, standDisabled: true, resetDisabled: false });
    setGameState(GameState.dealerTurn);
    revealCard();
  };

  const bust = async () => {
    const newBalance = Math.round((balance) * 100) / 100;
    setBalance(newBalance);
    try {
        await axios.put('/profile/balance', { balance: newBalance });
        window.dispatchEvent(new CustomEvent('balanceUpdated', {
            detail: { balance: newBalance }
        }));
    } catch (error) {
        console.error('Error al actualizar el balance:', error);
    }

    // Actualizar estadísticas
    let updatedStats = {
        gamesPlayed: 1,
        gamesWon: 0,
        gamesLost: 1, // Incrementar juegos perdidos
        totalWagered: bet,
        totalWon: 0,
        totalLost: bet, // Se pierde la apuesta
        lastPrize: 0,
        bestPrize: 0,
        highestBet: bet,
        highestStreak: highestStreak, 
    };

    try {
        await axios.put('/profile/statistics', updatedStats);
        window.dispatchEvent(new CustomEvent('statisticsUpdated', {
            detail: updatedStats
        }));
    } catch (error) {
        console.error('Error al actualizar las estadísticas:', error);
    }

    setMessage(Message.bust);
    setButtonState({ hitDisabled: true, standDisabled: true, resetDisabled: false });
};

  const checkWin = async () => {
    let updatedStats = {
        gamesPlayed: 1,
        gamesWon: 0,
        gamesLost: 0,
        totalWagered: bet,
        totalWon: 0,
        totalLost: 0,
        lastPrize: 0,
        bestPrize: 0,
        highestBet: bet,
        highestStreak: highestStreak, 
    };

    if (userScore > 21) {
        updatedStats.gamesLost = 1;
        updatedStats.totalLost = bet;
        setCurrentStreak(0);
        setMessage(Message.bust);
    } else if (dealerScore > 21 || userScore > dealerScore) {
        const newBalance = Math.round((balance + bet * 2) * 100) / 100;
        setBalance(newBalance);
        updatedStats.gamesWon = 1;
        updatedStats.totalWon = bet;
        updatedStats.lastPrize = bet;
        updatedStats.bestPrize = Math.max(updatedStats.bestPrize, bet);
        setCurrentStreak(currentStreak + 1); // Incrementar racha
        setHighestStreak(Math.max(highestStreak, currentStreak + 1));
        try {
            await axios.put('/profile/balance', { balance: newBalance });
            window.dispatchEvent(new CustomEvent('balanceUpdated', {
                detail: { balance: newBalance }
            }));
        } catch (error) {
            console.error('Error al actualizar el balance:', error);
        }
        setMessage(Message.userWin);
    } else if (dealerScore > userScore) {
        const newBalance = Math.round((balance) * 100) / 100;
        setBalance(newBalance);
        updatedStats.gamesLost = 1;
        updatedStats.totalLost = bet; 
        setCurrentStreak(0);
        try {
            await axios.put('/profile/balance', { balance: newBalance });
            window.dispatchEvent(new CustomEvent('balanceUpdated', {
                detail: { balance: newBalance }
            }));
        } catch (error) {
            console.error('Error al actualizar el balance:', error);
        }
        setMessage(Message.dealerWin);
    } else {
        const newBalance = Math.round((balance + bet) * 100) / 100; // Empate
        setBalance(newBalance);
        updatedStats.totalWon = bet;
        updatedStats.lastPrize = bet;
        try {
            await axios.put('/profile/balance', { balance: newBalance });
            window.dispatchEvent(new CustomEvent('balanceUpdated', {
                detail: { balance: newBalance }
            }));
        } catch (error) {
            console.error('Error al actualizar el balance:', error);
        }
        setMessage(Message.tie);
    }

    try {
        await axios.put('/profile/statistics', updatedStats);
        window.dispatchEvent(new CustomEvent('statisticsUpdated', {
            detail: updatedStats
        }));
    } catch (error) {
        console.error('Error al actualizar las estadísticas:', error);
    }
};

const [loans, setLoans] = useState([]);

const handleGameEnd = async (gameResult, wagerAmount) => {
  try {
    const updateResponse = await axios.post('/api/updateBalance', {
      gameResult,
      amount: wagerAmount,
    });
    setBalance(updateResponse.data.newBalance);

    const loanResponse = await axios.post('/api/loans/deduct');
    if (loanResponse.status === 200) {
      setBalance(loanResponse.data.newBalance);
      setLoans(loanResponse.data.remainingLoans);
      if (loanResponse.data.remainingLoans.length === 0) {
        alert('Todos los préstamos han sido pagados.');
      } else {
        alert('Préstamos actualizados. Revisa tu balance y préstamos activos.');
      }
    } else {
      console.error('Error al procesar préstamos:', loanResponse.data.message);
    }
  } catch (error) {
    console.error('Error al finalizar el juego:', error);
  }
};

return (
    <>
      {balance !== undefined ? (
        <Status 
          key={statusKey}
          message={message} 
          balance={balance} 
          placeBet={placeBet} 
          resetGame={resetGame} 
        />
      ) : (
        <div>{t('BLACKJACK.Cargando...')}</div>
      )}
      <Controls
        balance={balance}
        gameState={gameState}
        buttonState={buttonState}
        betEvent={placeBet}
        hitEvent={hit}
        standEvent={stand}
        resetEvent={resetGame}
        />
        <Hand title={`${t('BLACKJACK.Mano del Crupier')} (${dealerScore})`} cards={dealerCards} />
        <Hand title={`${t('BLACKJACK.Tu Mano')} (${userScore})`} cards={userCards} />
      </>
    );
  };
  
  export default Blackjack;