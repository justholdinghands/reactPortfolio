import { ChangeEvent, Component } from "react";
import { checkDiagonals, checkRows, transpose } from "./gameLogic";
import { fontSize, style } from "@mui/system";
import { theme } from "../../theme";
import styled from "styled-components";

const MAX_NUMBER = 20;
const MIN_NUMBER = 2;

export const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80vh;
`;

export const DivSetTable = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 80%;
`;

export const DivTurn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  font: 5vh ${theme.tictactoe.fontPrimary};
  color: ${theme.tictactoe.primary};
`;

export const DivResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 20vh;
  color: ${theme.tictactoe.primary};
`;

export const ButtonNewGame = styled.button`
  height: 4vh;
  width: fit-content;
  padding: 0 10px;
  background-color: ${theme.tictactoe.tertiary};
  color: ${theme.tictactoe.primary};
  font: 1.5vh/0 ${theme.tictactoe.fontSecondary};
  border: none;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  border-radius: 1vh;

  :hover {
    background-color: ${theme.tictactoe.primary};
    color: ${theme.tictactoe.tertiary};
  }
`;

export const DivInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  font-size: 3vh;
  height: 20vh;
`;

export const InputBoardSize = styled.input`
  text-align: center;
  height: 5vh;
  width: 25%;
  background-color: ${theme.tictactoe.secondary};
  color: ${theme.tictactoe.primary};
  border: none;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  border-radius: 1vh;
`;

export const TableGrid = styled.table`
  margin: 0 0 5vh 0;
  height: 50vh;
  width: 80%;
  display: grid;
  grid-template-rows: repeat(auto-fill, 1fr);
  border-collapse: separate;
  border-spacing: 0px;
  overflow: hidden;
`;

export const Tr = styled.tr`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
`;

export const Td = styled.td`
  heigth: 100%;
  display: grid;
`;

export const TBody = styled.tbody`
  height: 100%;
  width: 100%;
  max-height: 50vh;
  display: grid;
`;

// type DivBoxProps = { fontSize: string };
export const DivBox = styled.div`
  position: relative;
  background-color: ${theme.tictactoe.primary};
  color: ${theme.tictactoe.secondary};
  box-shadow: inset 2px 2px 2px 2px ${theme.tictactoe.fontPrimary};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  p {
    padding: 0;
    margin: 0;
    position: absolute;
    font-family: ${theme.tictactoe.fontPrimary};
  }
`;

export const PLAYER_X = "X" as const;
export const PLAYER_O = "O" as const;
export type BoardValues = typeof PLAYER_X | typeof PLAYER_O | null;
export const maxDynamicSize = 5;
export const winningLine = 5;

type State = {
  size: number;
  boardMatrix: BoardValues[][];
  xTurn: boolean;
  winner: BoardValues;
  gameOn: boolean;
  gameOver: boolean;
  clickedXtimes: number;
};

type Props = {
  className?: string;
};

const initializeBoardMatrix = (size: number) => {
  if (size < MIN_NUMBER) return [];
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => null)
  );
};

export default class Tictactoe extends Component<Props, State> {
  state = {
    size: 0,
    boardMatrix: [],
    xTurn: true,
    winner: null,
    gameOn: false,
    gameOver: false,
    clickedXtimes: 0,
  } as State;

  setSize = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      xTurn: true,
      winner: null,
      gameOver: false,
      clickedXtimes: 0,
      size: Number(this.restrictInput(e)),
      boardMatrix: initializeBoardMatrix(Number(e.target.value)),
    });
  };

  resetGame = () => {
    this.setState({
      size: 0,
      boardMatrix: [],
      xTurn: true,
      winner: null,
      gameOn: false,
      gameOver: false,
      clickedXtimes: 0,
    });
  };

  move = (rowIndex: number, columnIndex: number) => {
    if (
      this.state.boardMatrix[rowIndex][columnIndex] === null &&
      this.state.gameOver === false
    ) {
      this.setState(
        (prevState) => {
          return {
            boardMatrix: prevState.boardMatrix.map((row, i) =>
              row.map((cell, j) =>
                i === rowIndex && j === columnIndex
                  ? prevState.xTurn
                    ? PLAYER_X
                    : PLAYER_O
                  : cell
              )
            ),
            xTurn: !prevState.xTurn,
          };
        },
        () => {
          const whoWon = this.checkWin();
          if (whoWon) {
            this.setState({
              gameOver: true,
              winner: whoWon,
            });
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

  avoidLeadingZero = () => Number(this.state.size).toString();

  restrictInput = (e: ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    value === 0
      ? (value = 0)
      : value > MAX_NUMBER
      ? (value = MAX_NUMBER)
      : (e.target.value = value.toString());
    value !== 0 && value !== 1
      ? this.setState({ gameOn: true })
      : this.setState({ gameOn: false });
    e.target.value = value.toString();
    return e.target.value;
  };

  dynamicFontSize = {
    fontSize: 0,
  };
  setFontSize = (cellOffsetHeight) => {
    this.dynamicFontSize.fontSize = Number(cellOffsetHeight - 4);
  };
  render() {
    return (
      <DivContainer>
        <DivSetTable>
          <DivTurn>
            {!this.state.gameOn
              ? "Enter board size:"
              : !this.state.gameOver
              ? `${this.state.xTurn ? PLAYER_X : PLAYER_O}'s turn`
              : `${this.state.winner ? `${this.state.winner} wins!` : "Draw"}`}
          </DivTurn>
          <DivInput>
            {!this.state.gameOver && (
              <InputBoardSize
                type="number"
                onChange={this.setSize}
                value={this.avoidLeadingZero()}
              />
            )}
            {this.state.gameOver && (
              <ButtonNewGame onClick={this.resetGame}>New Game</ButtonNewGame>
            )}
          </DivInput>
        </DivSetTable>
        <TableGrid>
          <TBody>
            {this.state.boardMatrix.map((boardRow, rowIndex) => {
              return (
                <Tr key={rowIndex}>
                  {boardRow.map((cell, columnIndex) => (
                    <Td
                      key={columnIndex}
                      onClick={() => this.move(rowIndex, columnIndex)}
                    >
                      <DivBox
                        onClick={(e) =>
                          this.setFontSize(e.currentTarget.offsetHeight)
                        }
                        style={this.dynamicFontSize}
                      >
                        <p>{cell}</p>
                      </DivBox>
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </TBody>
        </TableGrid>
      </DivContainer>
    );
  }
}
