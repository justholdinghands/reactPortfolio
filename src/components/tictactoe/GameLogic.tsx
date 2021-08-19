import { BoardValues, maxDynamicSize, winningLine } from "./Tictactoe";

export const checkRows = (
  boardMatrix: BoardValues[][],
  size: number
): BoardValues => {
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

export const checkDiagonals = (arr: BoardValues[][]): BoardValues[][] => {
  let positiveSlope: BoardValues[] = [];
  let negativeSlope: BoardValues[] = [];
  let finalArr: BoardValues[][] = [];
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

/** inspiration: https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript */
export const transpose = (m: BoardValues[][]): BoardValues[][] =>
  m[0].map((_, i) => m.map((x) => x[i]));
