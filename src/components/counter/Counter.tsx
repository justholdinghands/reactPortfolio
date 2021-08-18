import { theme } from "./../../theme";
import { withRouter } from "react-router";
import Button from "./Button";
import React, { Component } from "react";
import pinkAxo from "./imgs/pink-axo-vertical.gif";
import styled from "styled-components";
import whiteAxo from "./imgs/white-axo-side.gif";

type State = {
  count: number;
};

type Props = {
  className?: string;
};

// styled-components definition
const DivMain = styled.div`
  * {
    padding: 0;
    margin: 0;
    color: ${theme.counter.primary};
    font: ${theme.counter.font_primary};
  }

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DivBtns = styled.div`
  display: flex;
  flex-direction: row;
  width: 30vw;
  justify-content: space-around;
  align-items: center;
`;

const DivTalk = styled.div`
  display: flex;
  justify-content: center;
  width: 30vw;
  height: 7rem;
`;

const DivCount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 80vh;
  overflow: hidden;
`;

const ImgWAxo = styled.img`
  display: block;
  position: absolute;
  left: 10rem;
  transform: scaleX(-1);
  height: 165px;
  margin-top: -25vh;
`;

const ImgPAxo = styled.img`
  display: block;
  position: absolute;
  right: 10rem;
  margin-top: 30vh;
  height: 150px;
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
      <DivMain id="main-div" className="counter">
        <ImgWAxo
          className="white-axo"
          src={whiteAxo}
          alt="white-axolotl"
        ></ImgWAxo>
        <DivCount id="count-div">
          <DivTalk id="talk">
            <h2>Counter:</h2>
          </DivTalk>
          <DivBtns id="btns-div">
            <Button
              className="plus-btn"
              onClick={this.plus}
              text="+"
              background="plus"
            ></Button>
            {count}
            <Button
              className="minus-btn"
              onClick={this.minus}
              text="-"
              background="minus"
            ></Button>
          </DivBtns>
        </DivCount>
        <ImgPAxo
          className="pink-axo"
          src={pinkAxo}
          alt="pink-axolotl"
        ></ImgPAxo>
      </DivMain>
    );
  }
}
