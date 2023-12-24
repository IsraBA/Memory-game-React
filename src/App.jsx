import './App.css'
import Board from './board/Board'
import Menu from './Menu/Menu'
import originalCards from './originalCards.json'
import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import victorySound from '../sounds/Victory Music Sound Effect.mp3'


function App() {

  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [newDeck, setNewDeck] = useState(originalCards);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // הגדרת הקונפטי
  const triggerConfettiR = () => {
    confetti({
      particleCount: 340,

      // Confetti from the right side
      angle: 117,
      spread: 40,
      origin: { x: 1.1, y: 1.8 },
      startVelocity: 140,
      ticks: 500,
      gravity: 0.8
    });
  };
  const triggerConfettiL = () => {
    confetti({
      particleCount: 340,

      // Confetti from the left side
      angle: 63,
      spread: 40,
      origin: { x: -0.1, y: 1.8 },
      startVelocity: 140,
      ticks: 500,
      gravity: 0.8
    });
  };

  const stopConfetti = () => {
    confetti.reset();
  }

  useEffect(() => {
    if (gameOver) {
      triggerConfettiR();
      triggerConfettiL();
    }
  }, [gameOver]);

  const changeAmount = (selectedAmount) => {
    setNewDeck((prevDeck) => {
      const newDeckSlice = originalCards.slice(0, selectedAmount + 1);
      shuffledCard(newDeckSlice);
      return newDeckSlice;
    });
  }

  const shuffledCard = (newDeck) => {
    const shuffledCard = newDeck.concat(newDeck)
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setFirstChoice(null);
    setSecondChoice(null);
    setCards(shuffledCard);
    setTurns(0)
  }

  // התחלת המשחק ישר כשהדף נפתח ללא צורך ללחוץ על משחק חדש
  useEffect(() => {
    shuffledCard(newDeck);
  }, [newDeck])

  // עצירת הטיימר כשנגמר המשחק
  useEffect(() => {
    if (gameOver) {
      setRunning(false);
    }
  }, [gameOver])

  return (

    <div className='memoryGame'>
      <div className="menu">
        <Menu shuffledCard={shuffledCard}
          changeAmount={changeAmount}
          newDeck={newDeck}
          setTime={setTime}
          setRunning={setRunning}
          setGameOver={setGameOver}
          setTurns={setTurns}
        />
      </div>
      <div className="board">
        <Board
          cards={cards}
          setCards={setCards}
          turns={turns}
          setTurns={setTurns}
          firstChoice={firstChoice}
          setFirstChoice={setFirstChoice}
          secondChoice={secondChoice}
          setSecondChoice={setSecondChoice}
          time={time}
          setTime={setTime}
          running={running}
          setRunning={setRunning}
          gameOver={gameOver}
          setGameOver={setGameOver}
        />
      </div>
      {gameOver ? <div className="victory">
        <span>ניצחת!</span>
        <button className='newGameEnd' onClick={() => {
          shuffledCard(newDeck),
            setTime(0),
            setRunning(false),
            setGameOver(false),
            stopConfetti()
        }}>משחק חדש</button>
        <button className='newGameEnd2'>משחק חדש</button>
      </div> : ""}
    </div>
  )
}

export default App
