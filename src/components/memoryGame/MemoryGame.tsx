import { randomSort } from "./arrayUtils";
import { theme } from "../../theme";
import { useEffect, useState } from "react";
import Piece from "./Piece";
import styled from "styled-components";

const DivWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 0vh;
`;

const PWinMessage = styled.p`
  text-align: center;
  width: 100vw;
  height: 0vh;
  font: 5em/0 ${theme.memoryGame.fontPrimary};
  color: ${theme.memoryGame.textColor};
`;

type Props = {
  className?: string;
};

type Card = {
  name: string;
  image: string;
  flippedNow: boolean;
};

const flipTime = 500;

const cards: Card[] = [
  {
    name: "a",
    image: "./imgs/urchin.jpg",
    flippedNow: false,
  },
  {
    name: "b",
    image: "./imgs/clown.jpeg",
    flippedNow: false,
  },
  {
    name: "c",
    image: "./imgs/jelly.jpg",
    flippedNow: false,
  },
  {
    name: "d",
    image: "./imgs/octo.jpg",
    flippedNow: false,
  },
  {
    name: "e",
    image: "./imgs/patrick.jpg",
    flippedNow: false,
  },
  {
    name: "f",
    image: "./imgs/rays.jpg",
    flippedNow: false,
  },
  {
    name: "g",
    image: "./imgs/turbellaria.jpg",
    flippedNow: false,
  },
  {
    name: "h",
    image: "./imgs/whale.jpg",
    flippedNow: false,
  },
];

const MemoryGame = (props: Props) => {
  const [numberOfTries, setNumberOfTries] = useState(0);

  const [flipTimeout, setFlipTimeout] =
    useState<ReturnType<typeof setTimeout>>();

  const [matrix, setMatrix] = useState<Card[]>(
    randomSort([...cards, ...cards])
  );

  const [guessedArr, setGuessedArr] = useState<Card[]>([]);

  const [flippedNowArr, setflippedNowArr] = useState<Card[]>([]);

  const closeAllCards = () => {
    setMatrix((p) => p.map((piece) => ({ ...piece, flippedNow: false })));
  };

  console.log(process.env.PUBLIC_URL);

  useEffect(() => {
    const flipped = matrix.filter((piece) => piece.flippedNow);
    if (flipped.length === 2) {
      setFlipTimeout(
        setTimeout(() => {
          checkMatch();
        }, flipTime)
      );
    }
  }, [matrix]);

  const checkMatch = () => {
    const flipped = matrix.filter((piece) => piece.flippedNow);

    if (flipped[0].name === flipped[1].name) {
      setGuessedArr((p) => [...p, ...flipped]);
      closeAllCards();
      setflippedNowArr([]);
    } else {
      setTimeout(() => closeAllCards(), flipTime);
    }
    setNumberOfTries((p) => p + 1);
  };

  const checkWin = () => {
    return guessedArr.length === matrix.length;
  };

  const flip = (index: number) => {
    const flipped = matrix.filter((piece) => piece.flippedNow);
    if (guessedArr.length !== matrix.length) {
      if (flipped.length === 1) {
        setflippedNowArr((p) => [...p, matrix[index]]);
        setMatrix((p) =>
          p.map((piece, i) => ({
            ...piece,
            flippedNow: i === index ? true : piece.flippedNow,
          }))
        );
      } else {
        setflippedNowArr([matrix[index]]);
        setMatrix((p) =>
          p.map((piece, i) => ({ ...piece, flippedNow: i === index }))
        );
      }
    }
  };

  const checkGuessed = (index: number) => {
    const card = matrix[index];
    return guessedArr.some((piece) => card.name === piece.name);
  };

  return (
    <DivWrapper>
      {checkWin() && (
        <PWinMessage>You won in {numberOfTries} tries!</PWinMessage>
      )}
      {matrix.map((e, index) => {
        return (
          <Piece
            key={e.name + index}
            index={index}
            name={e.name}
            image={e.image}
            isFlippedNow={matrix[index].flippedNow}
            isGuessed={checkGuessed(index)}
            onClick={() => {
              checkGuessed(index) ? "" : flip(index);
            }}
          ></Piece>
        );
      })}
    </DivWrapper>
  );
};

export default MemoryGame;
