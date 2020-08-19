import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import StatusBar from "./StatusBar";
import MemoryCard from "./MemoryCard";

const colors = [
  "pink",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "purple",
];
function generateCards() {
  const cards = [];
  for (let i = 0; i < colors.length; i++) {
    cards.push({
      key: i * 2,
      color: colors[i],
      isFlipped: false,
    });
    cards.push({
      key: i * 2 + 1,
      color: colors[i],
      isFlipped: false,
    });
  }
  return cards.sort(() => Math.random() - 0.5);
}

function flipCard(cards, keysToFlip) {
  return cards.map((card) => {
    return {
      ...card,
      isFlipped: keysToFlip.includes(card.key)
        ? !card.isFlipped
        : card.isFlipped,
    };
  });
}
/*function flipCard(cards, cardToFlip) {
  return cards.map((card) => {
    if (card.key === cardToFlip.key)
      return { ...card, isFlipped: !card.isFlipped };
    return card;
  });
}
*/

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return /*hours + " h " + */minutes + " min " + seconds + " s";
  }

function Memory() {
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [wrongPair, setWrongPair] = useState(null);
  const timeoutIds = useRef([]);
  //const [cards, setCards] = useState(generateCards()); [<current state><function to update state>] = useState(<initial state>)
  const [game, setGame] = useState({
    cards: generateCards(),
    firstCard: undefined,
  });

  /*function onCardClicked(card) {
    setStartTime(oldStartTime =>
        oldStartTime === 0 ? Date.now() : oldStartTime);
      // If the card is already flipped there is nothing we need to do (write an if-statement with a return; inside)
    if (card.isFlipped) {
      return;
    }

    setGame(({ cards, firstCard, secondCard }) => {
      // The { cards, firstCard, secondCard } above is the decomposed game object.
      // These three variables represent the previous state, before a card was clicked.
      // We should return the new state, depending on the previous one and on the card that was clicked.
      // There are 4 different cases.
      // 1. If both firstCard and secondCard from the previous state are undefined =>
      // we should flip the clicked card and set it as the firstCard
      if (!firstCard) {
        return { cards: flipCard(cards, card), firstCard: card };
      }
      // 2. Else, if firstCard is defined, but secondCard isn't =>
      // we should flip the clicked card, keep the firstCard as is, but set the secondCard
      else if (!secondCard) {
        return {
          cards: flipCard(cards, card),
          firstCard: firstCard,
          secondCard: card,
        };
      }
      // 3. Else, if the previous two clicked cards have the same color =>
      // we should flip the clicked card, set the new firstCard and remove secondCard from the state
      else if (firstCard.color === secondCard.color) {
        return { cards: flipCard(cards, card), firstCard: card };
      }
      // 4. Else, if the previous two clicked cards have different colors =>
      // we should flip the clicked card and flip back firstCard and secondCard,
      // we should also set the new firstCard and remove secondCard from the state
      else if (firstCard.color !== secondCard.color) {
        let newCards = flipCard(cards, firstCard);
        newCards = flipCard(newCards, secondCard);
        return {
          cards: flipCard(newCards, card),
          firstCard: card,
        };
      }
    });
  }
  */
  function onCardClicked(card) {
    if (card.isFlipped) {
      return;
    }
    setGame(({ cards, firstCard }) => {
      const newCards = flipCard(cards, [card.key]);
      if (!firstCard) {
        return {
          cards: newCards,
          firstCard: card,
        };
      } else {
        if (firstCard.color !== card.color) {
          setWrongPair([firstCard, card]);
        }
        return {
          cards: newCards,
        };
      }
    });
    if (startTime === 0) setStartTime(Date.now());
  }

  useEffect(() => {
    if (startTime !== 0) {
      const intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [startTime]);

  useEffect(() => {
    if (!wrongPair) return;
    const timeoutId = setTimeout(() => {
      setGame((oldGame) => {
        return {
          ...oldGame,
          cards: flipCard(
            oldGame.cards,
            wrongPair.map((card) => card.key)
          ),
        };
      });
    }, 1000);

    timeoutIds.current = timeoutIds.current.concat(timeoutIds.current);
  }, [wrongPair]);

  /* Runs when the restart button is clicked, resets the state with new cards */
  function onRestart() {
    setStartTime(0);
    setElapsedTime(0);
    timeoutIds.current.forEach((id) => clearTimeout(id));
    timeoutIds.current = [];
    setGame({
      cards: generateCards(),
      firstCard: undefined,
      secondCard: undefined,
    });
  }
  return (
    <div className="game-container">
      <StatusBar status={`Time: ${msToTime(elapsedTime)}`} onRestart={onRestart} />
      <div className="memory-grid">
        {game.cards.map((card) => (
          <MemoryCard
            key={card.key}
            color={card.color}
            isFlipped={card.isFlipped}
            onClick={() => onCardClicked(card)}
          />
        ))}
      </div>
    </div>
  );
}

export default Memory;
