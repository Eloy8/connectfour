import React, { useState } from 'react';
import Confetti from '../utils/Confetti';
import Celebration from '../assets/Celebration.mp3';
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
  const [hoverDiscLocation, setHoverDiscLocation] = useState(null);
  
  const renderDiscInGrid = (column) => {
    // Return in React Fragment, because "Divs cannot appear as a child of a tr"
    return (
      <>
        {column === DiscTypes.isNeutral && <div className="circle circle--white"></div>}
        {column === DiscTypes.isPlayer1 && <div className="circle circle--yellow"></div>}
        {column === DiscTypes.isPlayer2 && <div className="circle circle--red"></div>}
      </>
    )
  }

  const renderHoverDiscAboveGrid = () => {
    // ADD TO SCSS CALCULATION WHICH OFSETS EXAMPLE CIRCLE FROM THE LEFT, SO IT WILL HOVER ABOVE THE RIGHT ROW
    if (!weHaveAWinnerAnnouncement && hoverDiscLocation) {
      return (
        <>
          {currentPlayer === DiscTypes.isPlayer1 && <div className={`circle circle--yellow circle--hover-${hoverDiscLocation}`}></div>}
          {currentPlayer === DiscTypes.isPlayer2 && <div className={`circle circle--red circle--hover-${hoverDiscLocation}`}></div>}
        </>
      )
    }
    // Renders default a non-visible circle, to avoid spacing problems
    if (weHaveAWinnerAnnouncement || !hoverDiscLocation) {
      return (
        <>
          <div className="circle circle--white"></div>
        </>
      )
    }
  }

  const dropInADisc = (columnId) => {
    // Checks if column isn't already full
    if (individualGridHeightPerColumn[columnId] <= 0) {
      setShowColumnIsFullError(true);
      return;
    }
    // Disables discs after a win!
    if (weHaveAWinnerAnnouncement) {
      return;
    }
    setShowColumnIsFullError(false);
    updateConnectFourGrid(columnId);
    updateIndividualColumnHeight(columnId);
    checkGridForWinners();
  }

  const updateConnectFourGrid = (columnId) => {
    // Minus one because array starts counting from 0
    const rowOfNewDisc = individualGridHeightPerColumn[columnId] - 1;
    const copyOfConnectFourGrid = [...connectFourGrid];
    copyOfConnectFourGrid[rowOfNewDisc][columnId] = currentPlayer;
    setConnectFourGrid(copyOfConnectFourGrid);
    // alert(`copyOfConnectFourGrid[${rowOfNewDisc}][${columnId}]`)
  }

  const updateIndividualColumnHeight = (columnId) => {
    // The height is saved to easily determine where the next disc will land (+handy for a possible )
    const copyOfIndividualGridHeightPerColumn = [...individualGridHeightPerColumn];
    copyOfIndividualGridHeightPerColumn[columnId] -= 1;
    setIndividualGridHeightPerColumn(copyOfIndividualGridHeightPerColumn);
  }

  const checkGridForWinners = () => {
    // Checks grid horizontally, vertically and left/right-diagonal
    checkGridHorizontal();
    checkGridVertical();
    checkGridLeftDiagonal();
    checkGridRightDiagonal();
    finishUpRound();
    nextTurn();
  }

  const checkGridHorizontal = () => {
    for (var row = 0; row < connectFourRows; row++) {
      // The size of the rows minus 4 (array starts from 0 so 3)
      for (var column = 0; column < connectFourColumns - 3; column++){
        if (
          connectFourGrid[row][column] !== DiscTypes.isNeutral &&
          connectFourGrid[row][column] === connectFourGrid[row][column + 1]
          && connectFourGrid[row][column] === connectFourGrid[row][column + 2]
          && connectFourGrid[row][column] === connectFourGrid[row][column + 3]) {
            announceWinner();
          }
      }
    }
  }

  const checkGridVertical = () => {
    for (var column = 0; column < connectFourColumns; column++) {
      // The size of the rows minus 4 (array starts from 0 so 3)
      for (var row = 0; row < connectFourRows - 3; row++){
        if (
          connectFourGrid[row][column] !== DiscTypes.isNeutral &&
          connectFourGrid[row][column] === connectFourGrid[row + 1][column]
          && connectFourGrid[row][column] === connectFourGrid[row + 2][column]
          && connectFourGrid[row][column] === connectFourGrid[row + 3][column]) {
            announceWinner();
          }
      }
    }
  }

  const checkGridLeftDiagonal = () => {
    // LEFT = \
    for (var column = 0; column < connectFourColumns; column++) {
      // The size of the rows minus 4 (array starts from 0 so 3)
      for (var row = 0; row < connectFourRows - 3; row++){
        if (
          connectFourGrid[row][column] !== DiscTypes.isNeutral &&
          connectFourGrid[row][column] === connectFourGrid[row + 1][column + 1]
          && connectFourGrid[row][column] === connectFourGrid[row + 2][column + 2]
          && connectFourGrid[row][column] === connectFourGrid[row + 3][column + 3]) {
            announceWinner();
          }
      }
    }
  }

  const checkGridRightDiagonal = () => {
    // RIGHT = /
    // The columns get iterated backwards, so it starts at index 6 to 3
    for (var column = connectFourColumns - 1; column > (connectFourColumns - 1) - 4; column--) {
      // The size of the rows minus 4 (array starts from 0 so 3)
      for (var row = 0; row < connectFourRows - 3; row++){
        if (
          connectFourGrid[row][column] !== DiscTypes.isNeutral &&
          connectFourGrid[row][column] === connectFourGrid[row + 1][column - 1]
          && connectFourGrid[row][column] === connectFourGrid[row + 2][column - 2]
          && connectFourGrid[row][column] === connectFourGrid[row + 3][column - 3]) {
            announceWinner();
          }
      }
    }
  }

  const finishUpRound = () => {
    // Checks if the round is finished, if not continues game
    if (weHaveAWinnerAnnouncement) {
      announceWinner();
      return;
    }
    if (currentTurn === maxAmountOfTurns) {
      setweHaveAWinnerAnnouncement('Nobody won, it\'s a draw!');
      return;
    }
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
    <>
      <div>
        {renderHoverDiscAboveGrid()}
        <table className={`table ${!weHaveAWinnerAnnouncement && hoverDiscLocation ? ' table--default' : ''}`}>
          <tbody>
            {connectFourGrid && connectFourGrid.map((row, rowId) => (
              <tr key={rowId}>
                {row.map((column, columnId) => (
                    <td
                      key={columnId}
                      onClick={() => dropInADisc(columnId)}
                      onMouseEnter={() => setHoverDiscLocation(columnId + 1)}
                      onMouseLeave={() => setHoverDiscLocation(null)}>
                        {renderDiscInGrid(column)}
                    </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {!weHaveAWinnerAnnouncement && (
          <button
            onClick={() => resetGame()}
            disabled={currentTurn === defaultTurn}
            className={`button button--reset${currentTurn === defaultTurn ? " button--disabled" : ""}`}
          >
            Reset game
          </button>
        )}
        {!weHaveAWinnerAnnouncement && showColumnIsFullError && <h1>Column is full! Select another one.</h1>}
        {weHaveAWinnerAnnouncement && (
          <>
            <audio src={Celebration} autoPlay />
            <Confetti />
            <h1 className={weHaveAWinnerAnnouncement.includes("Player 1") ? "announcement--player1" : "announcement--player2"}>{weHaveAWinnerAnnouncement}</h1>
            <button
              onClick={() => resetGame()}
              className="button"
            >
              Next game!
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default GameGrid;
