import React, { useEffect, useState } from 'react'
import './Menu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fa0, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons'
import { faVolumeXmark } from '@fortawesome/free-solid-svg-icons'

export default function Menu(props) {

  const [selectAmount, setSelectAmount] = useState(14);
  const [startTP, setStartTP] = useState(false);

  useEffect(() => {
    props.changeAmount(selectAmount);
  }, [selectAmount])

  return (
    <div className='innerMenu'>
      <h1 className="title">משחק זיכרון קטלני</h1>
      <div className="options">
        <button className='mute' onClick={() => props.bgMusicIsPlaying ? props.fadeOutBackgroundMusic(0) : props.fadeInBackgroundMusic()}>
          {props.bgMusicIsPlaying ?
            <FontAwesomeIcon icon={faVolumeHigh} /> :
            <FontAwesomeIcon icon={faVolumeXmark} />}
        </button>
        <button className="level">
          <span>רמת קושי</span>
          <span className='expand'><FontAwesomeIcon icon={faChevronDown} /></span>
          <ul className='dropDown'>
            <li><button onClick={() => {
              setSelectAmount(4),
                props.shuffledCard(props.newDeck),
                props.setTime(0),
                props.setRunning(false),
                props.setGameOver(false),
                props.setPlayer1Turn(true),
                props.setTotalP1(0),
                props.setTotalP2(0),
                props.setcardsP1([]),
                props.setcardsP2([])
            }}>10 קלפים</button></li>
            <div className="line"></div>
            <li><button onClick={() => {
              setSelectAmount(9),
                props.shuffledCard(props.newDeck),
                props.setTime(0),
                props.setRunning(false),
                props.setGameOver(false),
                props.setPlayer1Turn(true),
                props.setTotalP1(0),
                props.setTotalP2(0),
                props.setcardsP1([]),
                props.setcardsP2([])
            }}>20 קלפים</button></li>
            <div className="line"></div>
            <li><button onClick={() => {
              setSelectAmount(14),
                props.shuffledCard(props.newDeck),
                props.setTime(0),
                props.setRunning(false),
                props.setGameOver(false),
                props.setPlayer1Turn(true),
                props.setTotalP1(0),
                props.setTotalP2(0),
                props.setcardsP1([]),
                props.setcardsP2([])
            }}>30 קלפים</button></li>
          </ul>
        </button>
        <button className='newGame' onClick={() => {
          props.shuffledCard(props.newDeck),
            props.setTime(0),
            props.setRunning(false),
            props.setGameOver(false),
            props.setPlayer1Turn(true),
            props.setTotalP1(0),
            props.setTotalP2(0),
            props.setcardsP1([]),
            props.setcardsP2([])
        }}>משחק חדש</button>

        {/* כפתור מצב שני שחקנים */}
        <button className='newGame'
          onClick={() => { props.twoPlayersMode ? props.setTwoPlayersMode(false) : setStartTP(true) }}>
          {props.twoPlayersMode ?
            <FontAwesomeIcon icon={faUser} style={{ fontSize: 21 }} />
            : <FontAwesomeIcon icon={faUserGroup} style={{ fontSize: 21 }} />}
          &nbsp;&nbsp;<span>{props.twoPlayersMode ? "מצב שחקן יחיד" : "מצב שני שחקנים"}</span>
        </button>

        {/* פופ אפ מצב שני שחקנים */}
        <div className="setTPbackgraund" id={startTP ? "" : "hideBgPop"}>
          <div className="setTP" id={startTP ? "" : "hidePop"}>
            <button className='cancel' onClick={() => setStartTP(false)}><FontAwesomeIcon icon={faX} /></button>
            <h2>
              <FontAwesomeIcon icon={faUserGroup} className='TPicon' />
              &nbsp;<span className='titleTPpop'>מצב שני שחקנים</span>
            </h2>
            <p>במצב שני שחקנים יתחרו שני שחקנים מי צובר יותר זוגות קלפים.<br />
              מציאת זוג קלפים מזכה בתור נוסף.</p>
            <form onSubmit={(e) => {
              e.preventDefault()
              { props.twoPlayersMode ? setStartTP(false) : "" }
            }}
            >
              <div className="inputs">
                <span>
                  <label htmlFor="player1">הזן שחקן ראשון</label>
                  <input
                    required
                    type="text"
                    name="player1"
                    id="player1"
                    // value={props.player1}
                    placeholder="שחקן ראשון"
                    maxLength="9"
                    onChange={(e) => props.setPlayer1(e.target.value)}
                  />
                </span>
                <div className='inputsLine'></div>
                <span>
                  <label htmlFor="player2">הזן שחקן שני</label>
                  <input
                    required
                    type="text"
                    name="player2"
                    id="player2"
                    // value={props.player2}
                    placeholder="שחקן שני"
                    maxLength="9"
                    onChange={(e) => props.setPlayer2(e.target.value)}
                  />
                </span>
              </div>
              <div className="go">
                <button
                  type="submit"
                  className='goButton'
                  onClick={() => { props.player1 && props.player2 ? props.setTwoPlayersMode(true) : {} }} >
                  התחל &nbsp;<FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: 20 }} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
