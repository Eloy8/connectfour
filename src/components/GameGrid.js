import React, { useState } from 'react';
import GameAnnouncements from './GameAnnouncements';
import { checkGridForWinners } from '../utils/CheckGridForWinners';
import '../scss/GameGrid.scss';

const GameGrid = () => {
  const defaultTurn = 1;
  const connectFourRows = 6;
  const connectFourColumns = 7;
  const maxAmountOfTurns = 42;
  const DiscTypes = {
    isNeutral: 0,
    isPlayer1: 1,
    isPlayer2: 2,
  }
  
  const emptyConnectFourGrid = new Array(connectFourRows).fill(null).map(() => new Array(connectFourColumns).fill(DiscTypes.isNeutral));
  const emptyIndividualGridHeightPerColumn = new Array(connectFourColumns).fill(connectFourRows);
  const [connectFourGrid, setConnectFourGrid] = useState(emptyConnectFourGrid);
  const [individualGridHeightPerColumn, setIndividualGridHeightPerColumn] = useState(emptyIndividualGridHeightPerColumn);
  const [showColumnIsFullError, setShowColumnIsFullError] = useState(false);
  const [currentTurn, setCurrentTurn] = useState(defaultTurn);
  const currentPlayer = currentTurn % 2 === 1 ? DiscTypes.isPlayer1 : DiscTypes.isPlayer2;
  const [weHaveAWinnerAnnouncement, setweHaveAWinnerAnnouncement] = useState(false);
  const [hoverDiscLocation, setHoverDiscLocation] = useState("4");
  const [discIsDropping, setDiscIsDropping] = useState(null);
  
  const renderDiscInGrid = (column) => {
    // Return in React Fragment, because "Divs cannot appear as a child of a tr"
    return (
      <>
        {column === DiscTypes.isNeutral && <div className="circle circle-white"></div>}
        {column === DiscTypes.isPlayer1 && <div className="circle circle-yellow"></div>}
        {column === DiscTypes.isPlayer2 && <div className="circle circle-red"></div>}
      </>
    )
  }

  const renderHoverDiscAboveGrid = () => {
    // Renders default a non-visible circle, to avoid spacing problems
    if(weHaveAWinnerAnnouncement) {
      return (
        <>
          <div className="circle circle-white"></div>
        </>
      )
    } else {
      return (
        <>
          {currentPlayer === DiscTypes.isPlayer1 && (<div className={`circle circle-yellow circle--hover-${hoverDiscLocation} ${discIsDropping ? `circle--drop-${discIsDropping}` : ''}` }></div>)}
          {currentPlayer === DiscTypes.isPlayer2 && (<div className={`circle circle-red circle--hover-${hoverDiscLocation} ${discIsDropping ? `circle--drop-${discIsDropping}` : ''}`}></div>)}
        </>
      )
    }
  }

  const onRowHover = (columnId) => {
    // The hover disc animation will be delayed if a disc is being dropped
    var waitTime = discIsDropping ? 1000 : 0;
    setTimeout(() => {
      setHoverDiscLocation(columnId + 1)
    }, waitTime);
  }

  const dropInADisc = (columnId) => {
    // Disables discs after a win!
    if (weHaveAWinnerAnnouncement) {
      return;
    }
    // Checks if column isn't already full
    if (individualGridHeightPerColumn[columnId] <= 0) {
      setShowColumnIsFullError(true);
      return;
    }

    // Shows dropping disc visual
    const dropDiscOnHeight = individualGridHeightPerColumn[columnId];
    console.log('dropdisconheight', dropDiscOnHeight);
    setDiscIsDropping(dropDiscOnHeight);

    //Waits for drop visual to end
    setTimeout(() => {
      setDiscIsDropping(null);
      setShowColumnIsFullError(false);
      updateConnectFourGrid(columnId);
      updateIndividualColumnHeight(columnId);
      finishUpRound();
    }, 1000);
  }

  const updateConnectFourGrid = (columnId) => {
    // Minus one because array starts counting from 0
    const rowOfNewDisc = individualGridHeightPerColumn[columnId] - 1;
    const copyOfConnectFourGrid = [...connectFourGrid];
    copyOfConnectFourGrid[rowOfNewDisc][columnId] = currentPlayer;
    setConnectFourGrid(copyOfConnectFourGrid);
  }

  const updateIndividualColumnHeight = (columnId) => {
    // The height is saved to easily determine where the next disc will land (+handy for a possible )
    const copyOfIndividualGridHeightPerColumn = [...individualGridHeightPerColumn];
    copyOfIndividualGridHeightPerColumn[columnId] -= 1;
    setIndividualGridHeightPerColumn(copyOfIndividualGridHeightPerColumn);
  }

  const finishUpRound = () => {
    checkGridForWinners(connectFourColumns, connectFourRows,connectFourGrid, DiscTypes, announceWinner);
    if (currentTurn === maxAmountOfTurns) {
      setweHaveAWinnerAnnouncement('Nobody won, it\'s a draw!');
      return;
    }

    nextTurn();
  }

  const announceWinner = () => {
    setweHaveAWinnerAnnouncement(`${currentPlayer === DiscTypes.isPlayer1 ? 'Player 1 (Yellow)' : "Player 2 (Red)"} won in ${currentTurn} turns!`);
  }

  const nextTurn = () => {
    if (!weHaveAWinnerAnnouncement) {
      setCurrentTurn(currentTurn + 1);
    }
  }

  const resetGame = () => {
    setCurrentTurn(defaultTurn);
    setIndividualGridHeightPerColumn(emptyIndividualGridHeightPerColumn);
    setConnectFourGrid(emptyConnectFourGrid);
    setweHaveAWinnerAnnouncement(false);
  }

  return (
    <div>
      {renderHoverDiscAboveGrid()}
      <table className={'table' + (weHaveAWinnerAnnouncement ? ' table--default' : '')}>
        <tbody>
          {connectFourGrid && connectFourGrid.map((row, rowId) => (
            <tr key={rowId}>
              {row.map((column, columnId) => (
                  <td
                    key={columnId}
                    onClick={() => !discIsDropping && dropInADisc(columnId)}
                    onMouseEnter={() => onRowHover(columnId)}
                    >
                      {renderDiscInGrid(column)}
                  </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <GameAnnouncements
        weHaveAWinnerAnnouncement={weHaveAWinnerAnnouncement}
        currentTurn={currentTurn}
        defaultTurn={defaultTurn}
        showColumnIsFullError={showColumnIsFullError}
        resetGame={() => resetGame()}
      />
    </div>
  );
};

export default GameGrid;
