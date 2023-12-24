import React, { useEffect, useState } from 'react'
import './Menu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

export default function Menu(props) {

  const [selectAmount, setSelectAmount] = useState(14)

  useEffect(() => {
    props.changeAmount(selectAmount);
  }, [selectAmount])

  return (
    <div className='innerMenu'>
      <h1 className="title">משחק זיכרון קטלני</h1>
      <div className="options">
        <button className="level">
          <span>רמת קושי</span>
          <span className='expand'><FontAwesomeIcon icon={faChevronDown} /></span>
          <ul className='dropDown'>
            <li><button onClick={() => {
              setSelectAmount(4),
                props.shuffledCard(props.newDeck),
                props.setTime(0),
                props.setRunning(false),
                props.setGameOver(false)
            }}>10 קלפים</button></li>
            <div className="line"></div>
            <li><button onClick={() => {
              setSelectAmount(9),
                props.shuffledCard(props.newDeck),
                props.setTime(0),
                props.setRunning(false),
                props.setGameOver(false)
            }}>20 קלפים</button></li>
            <div className="line"></div>
            <li><button onClick={() => {
              setSelectAmount(14),
                props.shuffledCard(props.newDeck),
                props.setTime(0),
                props.setRunning(false),
                props.setGameOver(false)
            }}>30 קלפים</button></li>
          </ul>
        </button>
        <button className='newGame' onClick={() => {
          props.shuffledCard(props.newDeck),
            props.setTime(0),
            props.setRunning(false),
            props.setGameOver(false)
        }}>משחק חדש</button>
      </div>
    </div>
  )
}
