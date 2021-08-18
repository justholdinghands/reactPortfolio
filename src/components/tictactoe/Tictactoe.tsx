import { ChangeEvent, Component } from "react";
import { theme } from "../../theme";
import styled from "styled-components";

// styles
export const DivInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DivWrapSettings = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
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
  justify-content: space-between;
  height: 80vh;
`;

export const InputBoardSize = styled.input`
  height: 5vh;
  width: 20vw;
  background-color: ${theme.tictactoe.secondary};
  color: ${theme.tictactoe.primary};
  font: 5vh/0 ${theme.tictactoe.font_secondary};
  border: none;
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
  winner: string;
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
      winner: "",
      gameOver: false,
      clickedXtimes: 0,
    };
  }

  setSize = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState((_p) => ({
      xTurn: true,
      winner: "",
      gameOver: false,
      clickedXtimes: 0,
      size: Number(e.target.value),
      boardMatrix: [...Array(Number(e.target.value))].map(() =>
        Array(Number(e.target.value)).fill(" ")
      ),
    }));
  };

  move = (row: number, column: number) => {
    if (
      this.state.boardMatrix[row][column] === " " &&
      this.state.gameOver === false
    ) {
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

  checkWin = (): string | false => {
    this.checkDraw();
    return (
      this.checkRows(this.state.boardMatrix) ||
      this.checkRows(this.transpose(this.state.boardMatrix)) ||
      this.checkRows(this.checkDiagonals(this.state.boardMatrix))
    );
  };

  checkRows = (boardMatrix: string[][]): string | false => {
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
            this.setState((_p) => ({ winner: boardMatrix[i][j] }));
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

  transpose = (m: string[][]): string[][] =>
    m[0].map((_, i) => m.map((x) => x[i]));

  checkDiagonals = (arr: string[][]): string[][] => {
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
        <DivWrapSettings>
          {!this.state.gameOver && (
            <DivTurn>Turn: {this.state.xTurn ? "X" : "O"}</DivTurn>
          )}
          {this.state.gameOver && (
            <div>
              <DivResult>
                {this.state.winner ? this.state.winner + " wins" : "Draw"}
              </DivResult>
            </div>
          )}
          <DivInput>
            <InputBoardSize
              type="number"
              onChange={this.setSize}
              value={Number(this.state.size).toString()}
              min="2"
              max="50"
            />
          </DivInput>
        </DivWrapSettings>
        <table>
          <tbody>
            {[...Array(this.state.size)].map((_, row) => {
              return (
                <tr key={row}>
                  {[...Array(this.state.size)].map((_, column) => (
                    <td key={column}>
                      <Box onClick={() => this.move(row, column)}>
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
