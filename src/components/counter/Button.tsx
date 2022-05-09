import { Component } from "react";
import { theme } from "./../../theme";
import styled from "styled-components";

type Props = {
  text: string;
  onClick: () => void;
};

const ButtonStyled = styled.button`
  width: 5rem;
  height: 5rem;
  border-radius: 10px;
  border: none;
  font: 3rem ${theme.fonts.fontFamily1};
  font-weight: 900;
  color: ${theme.colors.primaryFaded};
  background: ${theme.colors.white};
  cursor: pointer;

  :hover {
    background: ${theme.colors.primaryFaded};
    color: ${theme.colors.white};
  }
`;

export default class Button extends Component<Props> {
  render() {
    return (
      <ButtonStyled onClick={this.props.onClick}>
        {this.props.text}
      </ButtonStyled>
    );
  }
}
