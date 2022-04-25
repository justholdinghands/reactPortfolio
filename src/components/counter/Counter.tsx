import { Component } from "react";
import { theme } from "./../../theme";
import Button from "./Button";
import pinkAxo from "./imgs/pink-axo-vertical.gif";
import styled, { keyframes } from "styled-components";
import whiteAxo from "./imgs/white-axo-side.gif";

type State = {
  count: number;
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

const DivNumber = styled.div`
  position: absolute;
  left: 0;
  padding: 0 0 5% 0;
  margin: 0;
  font: ${theme.global.fontFamily1};
  font-size: 1300%;
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
        <DivNumber>
          {/*gx-0 w-100 position-fixed align-items-start align-content-center bottom-0 justify-content-center h-75 */}
          {count}
        </DivNumber>
        <div className="">
          {/* gx-0 w-100 position-absolute bottom-0 justify-content-center align-items-center */}
          <DivButtons>
            {/* className="d-flex w-auto align-items-end overflow-hidden gap-5 h-75 pb-5" */}
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
        </div>
      </DivContainer>
    );
  }
}
