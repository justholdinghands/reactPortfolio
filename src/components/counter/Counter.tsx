import { Component } from "react";
import { Row } from "react-bootstrap";
import { theme } from "./../../theme";
import Button from "./Button";
import styled, { keyframes } from "styled-components";

type State = {
  count: number;
  isDesktop: boolean;
};

type Props = {
  className?: string;
};

const DivMain = styled.div`
  * {
    color: ${theme.counter.primary};
    overflow: hidden;
  }

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const DivWrapCounter = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const DivBtns = styled.div`
  display: flex;
  flex-direction: row;
  width: 40%;
  height: 40%;
  justify-content: space-between;
  align-items: center;
  font: 10em ${theme.counter.fontPrimary};
`;

const DivTalk = styled.div`
  display: flex;
  justify-content: center;
  width: 30vw;
`;

const DivCount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;

  h2 {
    font: 5em ${theme.counter.fontPrimary};
  }
`;

const DivAxos = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  font: 2em ${theme.counter.fontPrimary};
  position: absolute;
`;

const whiteMove = keyframes`
    0% {
      left: -20%;
      top: 80%;
      transform: scaleX(-1);
    }
    50% {
      left: 150%;
      top: 80%;
      transform: scaleX(-1);
    }
    51% {
      left: 150%;
      top: 80%;
      transform: scaleX(1);
    }
    100% {
      left: 0;
      top: 80%;
      transform: scaleX(1);
    }
`;

const pinkMove = keyframes`
    0% {
      right: 0;
      bottom: 80%;
      transform: scaleX(1);
    }
    50% {
      right: 150%;
      bottom: 80%;
      transform: scaleX(1);
    }
    51% {
      transform: scaleX(-1);
    }
    100% {
      right: -50%;
      bottom: 80%;
      transform: scaleX(-1);
    }
`;

const ImgWAxo = styled.img`
  position: absolute;
  display: block;
  transform: scaleX(-1);
  height: 5em;
  animation: ${whiteMove} 50s infinite;
  animation-timing-function: linear;
`;

const ImgPAxo = styled.img`
  position: absolute;
  display: block;
  height: 5em;
  right: 0;
  animation: ${pinkMove} 50s infinite;
  animation-timing-function: linear;
`;

const buttonsStyle = {
  opacity: "100%",
  zIndex: "19",
};

const numberStyle = {
  font: `50vw ${theme.global.fontFamily1}`,
  color: `${theme.counter.btnClr}`,
  opacity: "40%",
  zIndex: "0",
  "overflow-y": "hidden",
};

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
      <>
        <Row
          className="gx-0 w-100 position-fixed align-items-start align-content-center bottom-0 justify-content-center h-75"
          style={numberStyle}
        >
          {count}
        </Row>
        <Row className="gx-0 w-100 position-absolute bottom-0 justify-content-center align-items-center">
          <div
            className="d-flex w-auto align-items-end overflow-hidden gap-5 h-75 pb-5"
            style={buttonsStyle}
          >
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
          </div>
        </Row>
      </>
    );
  }
}

// <DivMain id="main-div" className="counter">
//   <DivAxos>
//     <ImgWAxo
//       className="white-axo"
//       src={whiteAxo}
//       alt="white-axolotl"
//     ></ImgWAxo>
//     <ImgPAxo
//       className="pink-axo"
//       src={pinkAxo}
//       alt="pink-axolotl"
//     ></ImgPAxo>
//   </DivAxos>
//   <DivWrapCounter>
//     <DivCount id="count-div">
//       <DivTalk id="talk">
//         <h2>Counter:</h2>
//       </DivTalk>
//       <DivBtns id="btns-div">
//         <Button
//           className="plus-btn"
//           onClick={this.plus}
//           text="+"
//           background="plus"
//         ></Button>
//         {count}
//         <Button
//           className="minus-btn"
//           onClick={this.minus}
//           text="-"
//           background="minus"
//         ></Button>
//       </DivBtns>
//     </DivCount>
//   </DivWrapCounter>
// </DivMain>
