import { Component } from "react";
import { theme } from "./../../theme";
import Button from "./Button";
import styled from "styled-components";

type State = {
  count: number;
  isDesktop: boolean;
};

type Props = {
  className?: string;
};

const DivContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const DivButtons = styled.div`
  padding: 0 0 10% 0;
  left: calc(50% - 125px);
  width: 12rem;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const DivCount = styled.div`
  font: 15rem ${theme.fonts.fontFamily1};
  color: ${theme.colors.primaryFaded};
  opacity: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default class Counter extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      isDesktop: true,
    };
  }
  plus = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  minus = () => {
    this.setState((prevState) => ({
      count: prevState.count - 1,
    }));
  };

  render() {
    var { count } = this.state;
    return (
      <DivContainer>
        <DivCount>{count}</DivCount>

        <DivButtons>
          <Button text="+" onClick={this.plus}></Button>
          <Button text="-" onClick={this.minus}></Button>
        </DivButtons>
      </DivContainer>
    );
  }
}
