export const checkGridForWinners = (connectFourColumns, connectFourRows,connectFourGrid, DiscTypes, announceWinner) => {
  // Checks grid horizontally, vertically and left/right-diagonal
  checkGridHorizontal(connectFourColumns, connectFourRows,connectFourGrid, DiscTypes, announceWinner);
  checkGridVertical(connectFourColumns, connectFourRows,connectFourGrid, DiscTypes, announceWinner);
  checkGridLeftDiagonal(connectFourColumns, connectFourRows,connectFourGrid, DiscTypes, announceWinner);
  checkGridRightDiagonal(connectFourColumns, connectFourRows,connectFourGrid, DiscTypes, announceWinner);
}

const checkGridHorizontal = (connectFourColumns, connectFourRows,connectFourGrid, DiscTypes, announceWinner) => {
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

const checkGridVertical = (connectFourColumns, connectFourRows, connectFourGrid, DiscTypes, announceWinner) => {
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

const checkGridLeftDiagonal = (connectFourColumns, connectFourRows,connectFourGrid, DiscTypes, announceWinner) => {
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

const checkGridRightDiagonal = (connectFourColumns, connectFourRows,connectFourGrid, DiscTypes, announceWinner) => {
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