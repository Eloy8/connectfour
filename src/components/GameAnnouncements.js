import React from 'react';
import Confetti from '../utils/Confetti';
import Celebration from '../assets/Celebration.mp3';
import '../scss/GameGrid.scss';

const GameAnnouncements = ({
  weHaveAWinnerAnnouncement,
  currentTurn,
  defaultTurn,
  showColumnIsFullError,
  resetGame
}) => {
  if (!weHaveAWinnerAnnouncement && showColumnIsFullError) {
    return <h1 className="announcement">Column is full! Select another one.</h1>;
  }
  if (!weHaveAWinnerAnnouncement) {
    return (
      <button
        onClick={() => resetGame()}
        disabled={currentTurn === defaultTurn}
        className={`button button--reset${currentTurn === defaultTurn ? " button--disabled" : ""}`}
      >
        Reset game
      </button>
     )
    }
    if (weHaveAWinnerAnnouncement) {
      return (
        <>
        <audio src={Celebration} autoPlay />
        <Confetti />
        <h1 className={`announcement${weHaveAWinnerAnnouncement.includes("Player 1") ? " announcement--player1" : " announcement--player2"}`}>{weHaveAWinnerAnnouncement}</h1>
        <button
          onClick={() => resetGame()}
          className="button"
        >
          Next game!
        </button>
      </>
      )
    }
}
                                          
export default GameAnnouncements;
