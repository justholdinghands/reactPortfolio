import { Component, useState } from "react";
import { theme } from "../../theme";
import styled from "styled-components";

const ButtonPiece = styled.button<{
  flipped: boolean;
  image: string;
  guessed: boolean;
}>`
  height: 20vh;
  width: 23vw;
  background: ${(props) => (props.guessed ? "red" : "")};
  /* background: ${(props) =>
    props.flipped ? props.image : theme.pexeso.notFlipped}; */
`;

type Props = {
  name: string;
  image: string;
  index: number;
  isFlippedNow: boolean;
  isGuessed: boolean;
  onClick: () => void;
};

const Piece = (props: Props) => {
  // const [isFlipped, setFlip] = useState(false);
  return (
    <ButtonPiece
      guessed={props.isGuessed}
      flipped={props.isFlippedNow}
      onClick={props.onClick}
      image={props.image}
    >
      {props.name}
      {props.isFlippedNow && (
        <img width="100%" height="100%" src={props.image} />
      )}
    </ButtonPiece>
  );
};

export default Piece;
