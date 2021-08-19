import { Component, useState } from "react";
import { theme } from "../../theme";
import styled from "styled-components";

const ButtonPiece = styled.button<{ flipped: boolean; image: string }>`
  height: 20vh;
  width: 23vw;
  /* background: ${(props) =>
    props.flipped ? props.image : theme.pexeso.notFlipped}; */
`;

type Props = {
  name: string;
  image: string;
  index: number;
};

const Piece = (props: Props) => {
  const [isFlipped, setFlip] = useState(false);
  return (
    <ButtonPiece
      flipped={isFlipped}
      onClick={() => setFlip(!isFlipped)}
      image={props.image}
    >
      {props.name}
      {isFlipped && <img width="100%" height="100%" src={props.image} />}
    </ButtonPiece>
  );
};

export default Piece;
