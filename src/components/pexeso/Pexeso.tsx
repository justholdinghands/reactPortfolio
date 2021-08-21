import { Component, useEffect, useState } from "react";
import { faLessThanEqual } from "@fortawesome/free-solid-svg-icons";
import { pipeline } from "stream";
import { theme } from "../../theme";
import Piece from "./Piece";
import styled from "styled-components";
//styles
const DivWrapper = styled.div`
  border: red 2px solid;
`;

//logic
type Props = {
  className?: string;
};

type Card = {
  name: string;
  image: string;
  flippedNow: boolean;
};

const cards: Card[] = [
  {
    name: "a",
    image: "./imgs/worm1.jpg",
    flippedNow: false,
  },
  {
    name: "b",
    image: "./imgs/worm2.jpg",
    flippedNow: false,
  },
  {
    name: "c",
    image: "./imgs/worm3.jpg",
    flippedNow: false,
  },
  {
    name: "d",
    image: "./imgs/worm4.jpg",
    flippedNow: false,
  },
  {
    name: "e",
    image: "./imgs/worm5.jpg",
    flippedNow: false,
  },
  {
    name: "f",
    image: "./imgs/worm6.jpg",
    flippedNow: false,
  },
  {
    name: "g",
    image: "./imgs/worm7.jpg",
    flippedNow: false,
  },
  {
    name: "h",
    image: "./imgs/worm8.jpg",
    flippedNow: false,
  },
];

const randomSort = (array: Card[]) => {
  return array.sort(() => 0.5 - Math.random());
};

const Pexeso = (props: Props) => {
  const [matrix, setMatrix] = useState<Card[]>(
    randomSort([...cards, ...cards])
  );

  const [guessedArr, setGuessedArr] = useState<Card[]>([]);

  // const [flippedNowArr, setflippedNowArr] = useState<Card[]>([]);

  useEffect(() => {
    const flipped = matrix.filter((piece) => piece.flippedNow);
    if (flipped.length === 2) {
      setTimeout(checkMatch, 2000);
    }
  }, [matrix]);

  const checkMatch = () => {
    const flipped = matrix.filter((piece) => piece.flippedNow);

    if (flipped[0].name === flipped[1].name) {
      setGuessedArr((p) => [...p, ...flipped]);
      setMatrix((p) => p.map((piece) => ({ ...piece, flippedNow: false })));
      // setflippedNowArr([]);
    } else {
      setTimeout(
        () =>
          setMatrix((p) => p.map((piece) => ({ ...piece, flippedNow: false }))),
        500
      );
    }
  };

  const flip = (index: number) => {
    const flipped = matrix.filter((piece) => piece.flippedNow);
    if (flipped.length === 1) {
      // setflippedNowArr((p) => [...p, matrix[index]]);
      setMatrix((p) =>
        p.map((piece, i) =>
          i === index ? { ...piece, flippedNow: true } : { ...piece }
        )
      );
    } else {
      // setflippedNowArr([matrix[index]]);
      setMatrix((p) =>
        p.map((piece, i) =>
          i === index
            ? { ...piece, flippedNow: true }
            : { ...piece, flippedNow: false }
        )
      );
    }
  };

  const checkGuessed = (index: number) => {
    const card = matrix[index];
    return guessedArr.some((piece) => card.name === piece.name);
  };

  console.log(matrix);
  console.log(guessedArr);

  return (
    <DivWrapper>
      {matrix.map((e, index) => {
        return (
          <Piece
            key={e.name + index}
            index={index}
            name={e.name}
            image={e.image}
            isFlippedNow={matrix[index].flippedNow}
            isGuessed={checkGuessed(index)}
            onClick={() => flip(index)}
          ></Piece>
        );
      })}
    </DivWrapper>
  );
};

export default Pexeso;
