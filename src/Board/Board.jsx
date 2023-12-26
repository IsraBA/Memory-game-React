import React, { useEffect, useState } from 'react';
import SingleCard from '../singleCard/SingleCard';
import './Board.css';

export default function Board(props) {

  const [disabled, setDisabled] = useState(false);

  // קביעת גודל הקלפים בהתאם לכמות
  const [cardsAmount, setCardsAmount] = useState(props.cards.length);
  useEffect(() => {
    setCardsAmount(props.cards.length);
  }, [props.cards])

  // קליטת הבחירות
  const handleChoice = (card) => {
    // למנוע לחציה כפולה של המשתמש להפוך את הקלף השני ישר
    if (card.id === props.firstChoice?.id) return;

    props.firstChoice ? props.setSecondChoice(card) : props.setFirstChoice(card);
  }

  // שינוי המערך במידה והקלפים תואמים
  useEffect(() => {
    if (props.firstChoice && props.secondChoice) {
      setDisabled(true);
      if (props.firstChoice.cardName == props.secondChoice.cardName) {
        let newCards = [...props.cards];
        let ending = newCards.map(card => {
          if (card.cardName === props.firstChoice.cardName) {
            return { ...card, matched: true };
          }
          else {
            return card;
          }
        })
        props.setCards(ending);
        resetChoices();

        // הענקת נקודה לשחקן שצדק במצב שני שחקנים + הוספת הקלפים שצדק למערך שלו
        if (props.twoPlayersMode) {
          if (props.player1Turn) {
            props.setTotalP1(props.totalP1 + 1);
            let newCardsP1 = [...props.cardsP1]; 
            newCardsP1.push(props.firstChoice, props.secondChoice);
            props.setcardsP1(newCardsP1);
          }
          else {
            props.setTotalP2(props.totalP2 + 1);
            let newCardsP2 = [...props.cardsP2]; 
            newCardsP2.push(props.firstChoice, props.secondChoice);
            props.setcardsP2(newCardsP2);
          }
        }
        
        // סיום המשחק במידה וכל הקלפים תואמים
        if (ending.every(card => card.matched)) {
          props.setGameOver(true);
        }
      }
      else {
        setTimeout(() => resetChoices(), 1500);
        
        // מעבר תור לשחקן האחר במידה ולא נמצא זוג קלפים
        if (props.twoPlayersMode) {
          if (props.player1Turn) {
            props.setPlayer1Turn(false);
          }
          else {
            props.setPlayer1Turn(true);
          }
        }
      }
    }
  }, [props.firstChoice, props.secondChoice])

  // איפוס בחירות והוספת תור
  const resetChoices = () => {
    props.setFirstChoice(null)
    props.setSecondChoice(null)
    props.setTurns(pervTurns => pervTurns + 1)
    setDisabled(false);
  }

  // טיימר
  useEffect(() => {
    let interval;
    if (props.running) {
      interval = setInterval(() => {
        props.setTime(pervTime => pervTime + 10);
      }, 10);
    }
    else if (!props.running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [props.running])

  return (
    <>
      <div className='innerBoard'>
        {props.cards.map(card => {
          return <div
            // id={props.twoPlayersMode ? "twoPlayersModeON" : ""}
            className={cardsAmount === 10 ? "singleCard10" : cardsAmount === 20 ? "singleCard20" : cardsAmount === 30 ? "singleCard30" : "singleCard"}>
            <SingleCard
              card={card}
              key={card.id}
              handleChoice={handleChoice}
              flipped={card === props.firstChoice || card === props.secondChoice || card.matched}
              disabled={disabled}
              matched={card.matched}
              cardsAmount={cardsAmount}
              setRunning={props.setRunning}
              gameOver={props.gameOver}
              twoPlayersMode={props.twoPlayersMode}
              player1Turn={props.player1Turn}
            />
          </div>
        })}
      </div>
      <div className="turns">
        <span>תורות: {props.turns}</span>
        <div className='divider'></div>
        <span>זמן: <span>{("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((props.time / 10) % 100)).slice(-2)}</span></span>
      </div>
    </>
  );
}
