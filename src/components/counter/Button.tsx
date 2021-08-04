import { theme } from "./../../theme";
import React, { Component } from "react";
import styled from "styled-components";

type Props = {
  className: string;
  text: string;
  onClick: () => void;
  background: string;
};

// styled-components definition
type ButtonProps = { background: string };
const ButtonStyled = styled.button<ButtonProps>`
  width: 100px;
  height: 100px;
  border: 0;
  box-shadow: 0 5px 6px -6px black;
  background: ${(props) =>
    props.background === "plus"
      ? theme.count_plus
      : props.background === "minus"
      ? theme.count_minus
      : ""};

  :hover {
    box-shadow: 0 5px 6px -6px ${theme.ht_background},
      inset 0 0 150px -80px ${theme.ht_background};
    cursor: pointer;
  }

  :active {
    box-shadow: inset 0 0 200px -70px ${theme.ht_background};
  }
`;

export default class Button extends Component<Props> {
  render() {
    return (
      <ButtonStyled
        className={this.props.className}
        onClick={this.props.onClick}
        background={this.props.background}
      >
        {this.props.text}
      </ButtonStyled>
    );
  }
}
