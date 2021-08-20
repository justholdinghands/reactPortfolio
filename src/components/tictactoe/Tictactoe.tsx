import { ChangeEvent, Component } from "react";
import { checkDiagonals, checkRows, transpose } from "./GameLogic";
import { theme } from "../../theme";
import styled from "styled-components";

export const Table = styled.table`
  height: 100%;
  width: 50%;
`;

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
`;

export const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 85.3vh;
  width: 99.6vw;
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
  padding: 0;
  margin: 0;
  min-height: 100%;
  min-width: 100%;
  background-color: ${theme.tictactoe.box};
  color: ${theme.tictactoe.secondary};
  font: 100%/0 ${theme.tictactoe.fontPrimary};
`;

export const PLAYER_X = "X" as const;
export const PLAYER_O = "O" as const;
export type boardValues = typeof PLAYER_X | typeof PLAYER_O | null;
export const maxDynamicSize = 5;
export const winningLine = 5;

type State = {
  size: number;
  boardMatrix: boardValues[][];
  xTurn: boolean;
  winner: boardValues;
  gameOver: boolean;
  clickedXtimes: number;
};

type Props = {
  className?: string;
};

const initializeBoardMatrix = (size: number) => {
  return Array.from({ length: size }, () => Array(size).fill(null));
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

  setSize = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState((_p) => ({
      xTurn: true,
      winner: null,
      gameOver: false,
      clickedXtimes: 0,
      size: Number(e.target.value),
      boardMatrix: initializeBoardMatrix(Number(e.target.value)),
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
          const whoWon = this.checkWin();
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
        <Table>
          <tbody>
            {this.state.boardMatrix.map(
              (boardRow: boardValues[], rowIndex: number) => {
                return (
                  <tr key={rowIndex}>
                    {boardRow.map(
                      (element: boardValues, columnIndex: number) => (
                        <td
                          key={columnIndex}
                          onClick={() => this.move(rowIndex, columnIndex)}
                        >
                          <Box>{element}</Box>
                        </td>
                      )
                    )}
                  </tr>
                );
              }
            )}
          </tbody>
        </Table>
      </DivWrapper>
    );
  }
}
