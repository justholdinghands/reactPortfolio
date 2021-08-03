import { theme } from "./../../theme";
import React, { Component } from "react";
import styled from "styled-components";

type Props = {
  whatClass: string;
  text: string;
  func: () => void;
  bkg: string;
};

// styled-components definition
type ButtonProps = { bkg: string };
const ButtonStyled = styled.button<ButtonProps>`
  width: 100px;
  height: 100px;
  border: 0;
  box-shadow: 0 5px 6px -6px black;
  background: ${(props) =>
    props.bkg === "plus"
      ? theme.cnt_plus
      : props.bkg === "minus"
      ? theme.cnt_minus
      : ""};

  :hover {
    box-shadow: 0 5px 6px -6px #000000, inset 0 0 150px -80px #000000;
    cursor: pointer;
  }

  :active {
    box-shadow: inset 0 0 200px -70px #000000;
  }
`;

export default class Button extends Component<Props> {
  render() {
    let { whatClass, text, func, bkg } = this.props;
    return (
      <ButtonStyled className={whatClass} onClick={func} bkg={bkg}>
        {text}
      </ButtonStyled>
    );
  }
}
