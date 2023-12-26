import './App.css'
import Board from './board/Board'
import Menu from './Menu/Menu'
import originalCards from './originalCards.json'
import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import clapsSound from '../public/sounds/Clapping Sound Effect.mp3'
import BackgroundMusic from '../public/sounds/backgraund music 2.mp3'

function App() {

  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [newDeck, setNewDeck] = useState(originalCards);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [twoPlayersMode, setTwoPlayersMode] = useState(false);
  // משתנה שאומר תור מי
  const [player1Turn, setPlayer1Turn] = useState(true);
  // משתנה לכל משתמש שסוכם לו את הנקודות שהשיג
  const [totalP1, setTotalP1] = useState(0);
  const [totalP2, setTotalP2] = useState(0);
  // מערך גלובלי לכל משתמש שמכיל את הזוגות שמצא, לצורך הצגת הקלפים בקטן בעמודה שלו
  const [cardsP1, setcardsP1] = useState([]);
  const [cardsP2, setcardsP2] = useState([]);

  // הגדרת מוזיקת רקע
  const [bgMusicIsPlaying, setBgMusicIsPlaying] = useState(false);
  const [bgMusic, setBgMusic] = useState(new Audio(BackgroundMusic));
  const [soundsON, setSoundsON] = useState(false)

  // bgMusic.loop = true;

  // התחלת המוזיקה
  const fadeInBackgroundMusic = () => {
    bgMusic.play();
    bgMusic.loop = true;
    bgMusic.volume = 0.15;
    setBgMusicIsPlaying(true);
    setSoundsON(true);
  };
  // הפסקת המוזיקה בסוף המשחק בדעיכה
  const fadeOutBackgroundMusic = (num = Number) => {
    const fadeOut = bgMusic.animate({ volume: [bgMusic.volume, 0] }, num);

    fadeOut.onfinish = () => {
      bgMusic.pause();
      bgMusic.currentTime = 0;
      setBgMusicIsPlaying(false);
      setSoundsON(false);
    };
  };

  useEffect(() => {
    if (gameOver) {
      triggerConfettiR();
      triggerConfettiL();
      if (soundsON) {
        playVictorySound();
      }
      fadeOutBackgroundMusic(2000); // עצירת המוזיקה כהמשחק נגמר
    }
  }, [gameOver]);

  // הגדרת סאונד ניצחון
  const playVictorySound = () => {
    const clapsSoundAudio = new Audio(clapsSound);
    clapsSoundAudio.volume = 0.5;
    clapsSoundAudio.play();
  };

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
          player1={player1}
          setPlayer1={setPlayer1}
          player2={player2}
          setPlayer2={setPlayer2}
          twoPlayersMode={twoPlayersMode}
          setTwoPlayersMode={setTwoPlayersMode}
          setPlayer1Turn={setPlayer1Turn}
          setTotalP1={setTotalP1}
          setTotalP2={setTotalP2}
          setcardsP1={setcardsP1}
          setcardsP2={setcardsP2}
          bgMusicIsPlaying={bgMusicIsPlaying}
          fadeInBackgroundMusic={fadeInBackgroundMusic}
          fadeOutBackgroundMusic={fadeOutBackgroundMusic}
        />
      </div>
      <div className="board">
        <div className={twoPlayersMode ? 'allCards' : 'allCardsFull'}><Board
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
          twoPlayersMode={twoPlayersMode}
          player1Turn={player1Turn}
          setPlayer1Turn={setPlayer1Turn}
          totalP1={totalP1}
          setTotalP1={setTotalP1}
          totalP2={totalP2}
          setTotalP2={setTotalP2}
          cardsP1={cardsP1}
          setcardsP1={setcardsP1}
          cardsP2={cardsP2}
          setcardsP2={setcardsP2}
          soundsON={soundsON}
        /></div>

        {/* חלונית צד - מצב שני שחקנים */}
        {twoPlayersMode ? <div className="twoPlayersMode">
          <div className="player" id={player1Turn ? "turn" : ""}>
            <div className="playerName">{player1}</div>
            <div className="scoreHolder">
              <div className="score">{totalP1}</div>
              <span>נקודות</span>
            </div>
            <div className="foundCards">
              {cardsP1.map((card) => {
                return (
                  <div className="foundCard" key={card.id}>
                    <img
                      src={card.image}
                      alt="card front" />
                  </div>
                )
              })}
            </div>
          </div>
          <span className='TPModeLine'></span>
          <div className="player" id={player1Turn ? "" : "turn"}>
            <div className="playerName">{player2}</div>
            <div className="scoreHolder">
              <div className="score">{totalP2}</div>
              <span>נקודות</span>
            </div>
            <div className="foundCards">
              {cardsP2.map((card) => {
                return (
                  <div className="foundCard" key={card.id}>
                    <img
                      src={card.image}
                      alt="card front" />
                  </div>
                )
              })}
            </div>
          </div>
        </div> : ""}
      </div>

      {/* פופ אפ ניצחון */}
      {gameOver ? <div className="victory">
        <span>{twoPlayersMode ? `ניצחון ל${totalP1 > totalP2 ? player1 : player2}!` : "ניצחת!"}</span>
        <button className='newGameEnd' onClick={() => {
          shuffledCard(newDeck),
            setTime(0),
            setRunning(false),
            setGameOver(false),
            stopConfetti(),
            setPlayer1Turn(true),
            setTotalP1(0),
            setTotalP2(0),
            setcardsP1([]),
            setcardsP2([])
          // fadeInBackgroundMusic()
        }}>משחק חדש</button>
        <button className='newGameEnd2'>משחק חדש</button>
      </div> : ""}
    </div>
  )
}

export default App
