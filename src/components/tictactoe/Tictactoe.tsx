import { ChangeEvent, Component } from "react";
import { checkDiagonals, checkRows, transpose } from "./GameLogic";
import { theme } from "../../theme";
import styled from "styled-components";

export const DivInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5vw;
  height: 20vh;
`;
export const DivWrapSettings = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 30vw;
`;
export const DivResult = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 20vw;
  height: 20vh;
  font: 5em/0 ${theme.tictactoe.fontPrimary};
  color: ${theme.tictactoe.textColor};
  background: ${theme.tictactoe.background};
`;

export const DivTurn = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 20vw;
  height: 20vh;
  font: 5em/0 ${theme.tictactoe.fontPrimary};
  color: ${theme.tictactoe.textColor};
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
  font: 5vh/0 ${theme.tictactoe.fontSecondary};
  border: none;
`;

export const Box = styled.button`
  height: 10vw;
  width: 10vw;
  background-color: ${theme.tictactoe.box};
  color: ${theme.tictactoe.secondary};
  font: 4vw/0 ${theme.tictactoe.fontPrimary};
`;

export type BoardValues = "X" | "O" | null;
export const PLAYER_X = "X";
export const PLAYER_O = "O";
export const maxDynamicSize = 5;
export const winningLine = 5;

type State = {
  size: number;
  boardMatrix: BoardValues[][];
  xTurn: boolean;
  winner: BoardValues;
  gameOver: boolean;
  clickedXtimes: number;
};

type Props = {
  className?: string;
};

export default class Tictactoe extends Component<Props, State> {
  state = {
    size: 0,
    boardMatrix: [],
    xTurn: true,
    winner: null,
    gameOver: false,
    clickedXtimes: 0,
  };

  initializeBoardMatrix = (value: string) => {
    return [...Array(Number(value))].map(() => Array(Number(value)).fill(null));
  };

  setSize = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState((_p) => ({
      xTurn: true,
      winner: null,
      gameOver: false,
      clickedXtimes: 0,
      size: Number(e.target.value),
      boardMatrix: this.initializeBoardMatrix(e.target.value),
    }));
  };

  move = (rowIndex: number, columnIndex: number) => {
    if (
      this.state.boardMatrix[rowIndex][columnIndex] === null &&
      this.state.gameOver === false
    ) {
      this.setState(
        (prevState) => {
          return {
            boardMatrix: prevState.boardMatrix.map((arr, i) =>
              arr.map((element, j) =>
                i === rowIndex && j === columnIndex
                  ? prevState.xTurn
                    ? PLAYER_X
                    : PLAYER_O
                  : element
              )
            ),
            xTurn: !prevState.xTurn,
          };
        },
        () => {
          let whoWon = this.checkWin();
          if (whoWon) {
            this.setState((_p) => ({
              gameOver: true,
              winner: whoWon,
            }));
          }
        }
      );
      this.clickCounter();
    }
  };

  checkDraw = () => {
    if (this.state.clickedXtimes === this.state.size * this.state.size) {
      this.setState({ gameOver: true });
    }
  };

  checkWin = () => {
    this.checkDraw();
    return (
      checkRows(this.state.boardMatrix, this.state.size) ||
      checkRows(transpose(this.state.boardMatrix), this.state.size) ||
      checkRows(checkDiagonals(this.state.boardMatrix), this.state.size)
    );
  };

  clickCounter = () =>
    this.setState((prevState) => ({
      clickedXtimes: prevState.clickedXtimes + 1,
    }));

  render() {
    return (
      <DivWrapper>
        <DivWrapSettings>
          {!this.state.gameOver && (
            <DivTurn>Turn: {this.state.xTurn ? PLAYER_X : PLAYER_O}</DivTurn>
          )}
          {this.state.gameOver && (
            <DivResult>
              {this.state.winner ? this.state.winner + " wins" : "Draw"}
            </DivResult>
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
            {Array.from({ length: this.state.size }, (_, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {Array.from({ length: this.state.size }, (_, columnIndex) => (
                    <td key={columnIndex}>
                      <Box onClick={() => this.move(rowIndex, columnIndex)}>
                        {this.state.boardMatrix[rowIndex][columnIndex]}
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
