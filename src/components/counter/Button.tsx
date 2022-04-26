import { Component } from "react";
import { theme } from "./../../theme";
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
  border-radius: 10px;
  border: none;
  font: 3rem ${theme.global.fontFamily1};
  font-weight: bolder;
  color: ${theme.global.defaultClr};
  background: ${theme.global.titleClr};
  cursor: pointer;
  }

  :hover {
    box-shadow: 0 7px 9px -9px ${theme.hackertyper.background},
      inset 0 0 220px -120px ${theme.hackertyper.background};
    cursor: pointer;
  }

  :active {
    box-shadow: inset 0 0 200px -70px ${theme.hackertyper.background};
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
