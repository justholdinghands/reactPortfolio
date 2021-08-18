import { Component } from "react";
import { theme } from "../../theme";
import styled from "styled-components";

// styles
export const DivResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 20vh;
  font: 5em/0 ${theme.tictactoe.font_primary};
  color: ${theme.tictactoe.text_color};
  background: ${theme.tictactoe.background};
`;

export const DivTurn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 20vh;
  font: 5em/0 ${theme.tictactoe.font_primary};
  color: ${theme.tictactoe.text_color};
  background: ${theme.tictactoe.background};
`;

export const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const InputBoardSize = styled.input`
  height: 5vh;
  width: 20vw;
  background-color: ${theme.tictactoe.secondary};
  color: ${theme.tictactoe.primary};
  font: 5vh/0 ${theme.tictactoe.font_secondary};
  border: none;
  margin-bottom: 5rem;
`;

export const Box = styled.button`
  height: 10vw;
  width: 10vw;
  background-color: ${theme.tictactoe.box};
  color: ${theme.tictactoe.secondary};
  font: 4vw/0 ${theme.tictactoe.font_primary};
`;

// logic
type State = {
  size: number;
  boardMatrix: string[][];
  xTurn: boolean;
  isWinning: string;
  gameOver: boolean;
  clickedXtimes: number;
};

type Props = {
  className?: string;
};
export default class Tictactoe extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      size: 0,
      boardMatrix: [],
      xTurn: true,
      isWinning: "",
      gameOver: false,
      clickedXtimes: 0,
    };
    this.checkWin = this.checkWin.bind(this);
  }

  setSize = (e) => {
    this.setState((_p) => ({
      xTurn: true,
      isWinning: "",
      gameOver: false,
      clickedXtimes: 0,
      size: Number(e.target.value),
      boardMatrix: [...Array(Number(e.target.value))].map(() =>
        Array(Number(e.target.value)).fill(" ")
      ),
    }));
  };

  move = (row: number, column: number) => {
    if (this.state.boardMatrix[row][column] === " ") {
      this.setState(
        (prevState) => {
          let newMatrix = [...[...prevState.boardMatrix]];
          newMatrix[row][column] = prevState.xTurn ? "X" : "O";
          return {
            boardMatrix: newMatrix,
            xTurn: !prevState.xTurn,
          };
        },
        () => {
          this.checkWin();
        }
      );
      this.clickCounter();
    }
  };

  checkDraw = () => {
    if (this.state.clickedXtimes === this.state.size * this.state.size) {
      this.setState((_p) => ({ gameOver: true }));
    }
  };

  checkWin = () => {
    this.checkDraw();
    return (
      this.checkRows(this.state.boardMatrix) ||
      this.checkRows(this.transpose(this.state.boardMatrix)) ||
      this.checkRows(this.checkDiagonals(this.state.boardMatrix))
    );
  };

  checkRows = (boardMatrix) => {
    let winningLength = this.state.size > 5 ? 5 : this.state.size;
    let count = 1;
    for (let i = 0; i < boardMatrix.length; i++) {
      for (let j = 0; j < boardMatrix[i].length - 1; j++) {
        if (
          boardMatrix[i][j] !== " " &&
          boardMatrix[i][j] === boardMatrix[i][j + 1]
        ) {
          count++;
          if (winningLength === count) {
            this.setState((_p) => ({ gameOver: true }));
            this.setState((_p) => ({ isWinning: boardMatrix[i][j] }));
            return boardMatrix[i][j];
          }
        } else {
          count = 1;
        }
      }
      count = 1;
    }
    return false;
  };

  clickCounter = () =>
    this.setState((prevState) => ({
      clickedXtimes: prevState.clickedXtimes + 1,
    }));

  transpose = (m: string[][]) => m[0].map((_, i) => m.map((x) => x[i]));

  checkDiagonals = (arr: string[][]) => {
    let positiveSlope: string[] = [];
    let negativeSlope: string[] = [];
    let finalArr: string[][] = [];
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

  render() {
    return (
      <DivWrapper>
        {!this.state.gameOver && (
          <DivTurn>Turn: {this.state.xTurn ? "X" : "O"}</DivTurn>
        )}
        {this.state.gameOver && (
          <DivResult>
            {this.state.isWinning ? this.state.isWinning + " wins" : "Draw"}
          </DivResult>
        )}
        <InputBoardSize
          type="number"
          onChange={this.setSize}
          value={Number(this.state.size).toString()}
          min="1"
          max="50"
        />
        <table>
          <tbody>
            {[...Array(this.state.size)].map((_, row) => {
              return (
                <tr key={row}>
                  {[...Array(this.state.size)].map((_, column) => (
                    <td key={column}>
                      <Box
                        onClick={() =>
                          this.checkWin() === false
                            ? this.move(row, column)
                            : ""
                        }
                      >
                        {this.state.boardMatrix[row][column]}
                      </Box>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </DivWrapper>
    );
  }
}
