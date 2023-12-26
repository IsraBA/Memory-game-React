import React from 'react'
import './singleCard.css'
import CardFlipSound from '../../sounds/Card Flip Sound Effect.mp3'


export default function SingleCard(props) {

    const handleClick = () => {
        if (!props.disabled) {
            props.handleChoice(props.card);
        }
    }

    return (
        <div onClick={props.gameOver ? () => {} : () => { props.setRunning(true)}}>
            <div className={props.flipped ? "flipped" : ""}>
                <img
                    className='front'
                    id={props.matched ? 'matched' : ""}
                    src={props.card.image}
                    alt="card front" />
                <span className='back' onClick={handleClick}></span>
            </div>
        </div>
    )
}
