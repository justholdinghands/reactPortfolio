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
  width: 5rem;
  height: 5rem;
  border-radius: 8px;
  border: none;
  font: 3rem ${theme.global.fontFamily1};
  font-weight: bolder;
  color: ${theme.global.defaultClr};
  background: ${theme.global.titleClr};
  cursor: pointer;
  }

  :hover {
    background: ${theme.global.activeBg};
    color: ${theme.global.activeClr};
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
