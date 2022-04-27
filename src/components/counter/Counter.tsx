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
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DivButtons = styled.div`
  padding: 0 0 10% 0;
  margin: 0;
  position: absolute;
  bottom: 0;
  left: calc(50% - 125px);
  width: 250px;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const DivCount = styled.div`
  position: absolute;
  left: 0;
  padding: 0 0 5% 0;
  margin: 0;
  font: 2000% ${theme.global.fontFamily1};
  color: ${theme.counter.nmbrClr};
  opacity: 100%;
  z-index: 0;
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
    // console.log(
    //   `isDesktop: ${this.props.isDesktop.valueOf}, chooseNumberPosition.font: ${this.chooseNumberPosition.font.valueOf}`
    // );
    return (
      <DivContainer>
        <DivCount>{count}</DivCount>

        <DivButtons>
          <Button
            className="plus-btn"
            onClick={this.plus}
            text="+"
            background="plus"
          ></Button>
          <Button
            className="minus-btn"
            onClick={this.minus}
            text="-"
            background="minus"
          ></Button>
        </DivButtons>
      </DivContainer>
    );
  }
}
