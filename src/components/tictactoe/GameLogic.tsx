import { boardValues, maxDynamicSize, winningLine } from "./Tictactoe";

/**
 * Checks for 5 matching box values in a row
 *  If entered playing board size bigger than maxDynamicSize - check for winningLine number of consecutive identical values
 *  Else the number of consecutive identical values is the same as size
 * @param boardMatrix filled with values
 * @param size of one dimension of the boardMatrix - defined by user
 * @returns winning player ("X" | "O") or null if draw
 */
export const checkRows = (
  boardMatrix: boardValues[][],
  size: number
): boardValues => {
  let winningLength = size > maxDynamicSize ? winningLine : size;
  let count = 1;
  for (let i = 0; i < boardMatrix.length; i++) {
    for (let j = 0; j < boardMatrix[i].length - 1; j++) {
      if (
        boardMatrix[i][j] !== null &&
        boardMatrix[i][j] === boardMatrix[i][j + 1]
      ) {
        count++;
        if (winningLength === count) {
          return boardMatrix[i][j];
        }
      } else {
        count = 1;
      }
    }
    count = 1;
  }
  return null;
};

/**
 * To check for consecutive identical values in positive and negative diagonals
 * Transforms original matrix so that it can be checked by checkRows function
 * @param arr == boardMatrix filled with values
 * @returns new matrix containing positive and negative slopes of the original matrix in rows (so that the new matrix can be checked by checkRows)
 */
export const checkDiagonals = <Type,>(arr: Type[][]) => {
  let positiveSlope: Type[] = [];
  let negativeSlope: Type[] = [];
  let finalArr: Type[][] = [];
  for (var i = 0; i < arr.length * 2; i++) {
    for (var j = 0; j <= i; j++) {
      var k = i - j;
      if (k < arr.length && j < arr.length) {
        positiveSlope.push(arr[k][j]);
      }
      var h = arr.length - j - 1;
      if (k < arr.length && h < arr.length && h >= 0) {
        negativeSlope.push(arr[k][h]);
      }
    }
    finalArr.push(positiveSlope);
    finalArr.push(negativeSlope);
    positiveSlope = [];
    negativeSlope = [];
  }
  return finalArr;
};

/**
 * To check for consecutive identical values in columns
 * Transforms original matrix so it can be checked by checkRows function
 * @param m boardMatrix filled with values
 * @returns transformed matrix
 */
/** inspiration: https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript */
export const transpose = <Type,>(m: Type[][]) =>
  m[0].map((_, i) => m.map((x) => x[i]));
