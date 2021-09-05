import { Component } from "react";
import { theme } from "./../../theme";
import Button from "./Button";
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
    color: ${theme.counter.primary};
    font: ${theme.counter.fontPrimary};
  }

  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DivWrapCounter = styled.div`
  width: 50%;
  border: green 2px solid;
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
  width: 100%;
  height: 80%;
  overflow: hidden;
  border: yellow 2px solid;
`;

const DivAxos = styled.div`
  width: 100%;
  border: orange 2px solid;
`;

const ImgWAxo = styled.img`
  display: block;
  position: absolute;
  transform: scaleX(-1);
  height: 165px;
  border: white 2px solid;
`;

const ImgPAxo = styled.img`
  display: block;
  position: absolute;
  height: 150px;
  border: pink 2px solid;
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
        <DivWrapCounter>
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
          <DivAxos>
            <ImgWAxo
              className="white-axo"
              src={whiteAxo}
              alt="white-axolotl"
            ></ImgWAxo>
            <ImgPAxo
              className="pink-axo"
              src={pinkAxo}
              alt="pink-axolotl"
            ></ImgPAxo>
          </DivAxos>
        </DivWrapCounter>
      </DivMain>
    );
  }
}
