import { theme } from "../../theme";
import shark from "./shark.png";
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
  font: 2vw/0 ${theme.memoryGame.fontPrimary};
  color: ${theme.memoryGame.textColor};
  border: ${theme.memoryGame.background} 2px solid;
  border-radius: 5%;
  background: ${(props) =>
    props.guessed ? theme.memoryGame.background : theme.memoryGame.notFlipped};
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  z-index: 1;
  background-size: contain;
  border-radius: 5%;
`;

const ImgBack = styled.img`
  width: 30%;
  height: 30%;
  z-index: 1;
  background-size: cover;
  filter: hue-rotate(210deg);
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
        (!props.isGuessed && <ImgBack src={shark} />)}
    </ButtonPiece>
  );
};

export default Piece;
