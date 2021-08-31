import { Component, useState } from "react";
import { theme } from "../../theme";
import styled from "styled-components";

const ButtonPiece = styled.div<{
  flipped: boolean;
  image: string;
  guessed: boolean;
}>`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
  width: 20vw;
  font: 2vw/0 ${theme.pexeso.fontPrimary};
  color: ${theme.pexeso.primaryTextColor};
  border: ${theme.pexeso.background} 2px solid;
  border-radius: 5%;
  background: ${(props) =>
    props.guessed ? theme.pexeso.background : theme.pexeso.notFlipped};
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  z-index: 1;
  background-size: cover;
  border-radius: 5%;
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
  return (
    <ButtonPiece
      guessed={props.isGuessed}
      flipped={props.isFlippedNow}
      onClick={props.onClick}
      image={props.image}
    >
      {(props.isFlippedNow && <Img src={props.image} />) ||
        (!props.isGuessed && "Turbellaria")}
    </ButtonPiece>
  );
};

export default Piece;
