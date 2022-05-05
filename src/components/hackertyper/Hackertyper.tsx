import { Component } from "react";
import { codeDemo } from "./code";
import { theme } from "../../theme";
import Welcome from "./Welcome";
import styled from "styled-components";

const DivContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 95%;
  width: 800px;
  max-width: 80vw;
  background-color: ${theme.colors.background};
  color: ${theme.colors.primary};
`;

const DivFade = styled.div`
  position: absolute;
  background: ${theme.colors.fadeTop};
  width: 100%;
  height: 30px;
  top: 3%;
  z-index: 2;
`;

const DivTerminal = styled.div`
  position: absolute;
  bottom: 5%;
  display: flex;
  flex-direction: column-reverse;
  white-space: pre;
  width: 100%;
  height: 92%;
  word-wrap: break-word;
  overflow-y: scroll;
  overflow-x: hidden;
  font-family: ${theme.fonts.fontFamily2};
  ::-webkit-scrollbar {
    width: 0;
  }
`;

const DivPopups = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 100%:
  font: 2em ${theme.fonts.fontFamily2};

  div {
    display: flex;
    text-align: center;
    align-items: center;
    height: 15vh;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.grey}; 
    }
`;

const DivPopDenied = styled.div`
  border: 0.5vh solid ${theme.colors.fail};
  color: ${theme.colors.fail};s
`;

const DivPopGranted = styled.div`
  border: 0.5vh solid ${theme.colors.pass};
  color: ${theme.colors.pass};
`;

type State = {
  code: string;
  position: number;
  isWelcome: boolean;
  cnt: number;
  key: string;
  isDenied: boolean;
  isGranted: boolean;
  altCnt: number;
  clCnt: number;
};

type Props = {
  className?: string;
};

const keyCodes = {
  ALT: 18,
  CAPS: 20,
  ESC: 27,
  BACKSPACE: 8,
};

const pressXTimes = {
  pressCAPS: 2,
  pressALT: 3,
};

const stepSize = 13;

export default class Hackertyper extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      position: 0,
      isWelcome: true,
      cnt: 0,
      key: "",
      isDenied: false,
      isGranted: false,
      altCnt: 0,
      clCnt: 0,
    };
    this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.pressKey);
  }

  pressKey = (e) => {
    if (this.state.isWelcome === true) {
      this.setState({
        isWelcome: false,
      });
    }

    if (e.keyCode === keyCodes.ALT) {
      this.setState((prevState) => ({
        altCnt: prevState.altCnt + 1,
      }));
      if (this.state.altCnt === pressXTimes.pressCAPS) {
        this.setState({
          isGranted: true,
          isDenied: false,
          altCnt: 0,
          clCnt: 0,
        });
      }
    } else if (e.keyCode === keyCodes.CAPS) {
      this.setState((prevState) => ({
        clCnt: prevState.clCnt + 1,
      }));
      if (this.state.clCnt === pressXTimes.pressALT) {
        this.setState({
          isDenied: true,
          isGranted: false,
          clCnt: 0,
          altCnt: 0,
        });
      }
    } else if (e.keyCode === keyCodes.ESC) {
      this.setState({
        isDenied: false,
        isGranted: false,
        altCnt: 0,
        clCnt: 0,
      });
    } else {
      this.setState({
        altCnt: 0,
        clCnt: 0,
      });
    }

    if (e.keyCode === keyCodes.BACKSPACE) {
      let i =
        this.state.position - stepSize < 0 ? 0 : this.state.position - stepSize;
      this.setState((prevState) => ({
        code: codeDemo.substring(0, i),
        position:
          prevState.position - stepSize < 0 ? 0 : prevState.position - stepSize,
      }));
    } else if (
      e.keyCode !== keyCodes.ALT &&
      e.keyCode !== keyCodes.CAPS &&
      e.keyCode !== keyCodes.ESC &&
      !this.state.isDenied &&
      !this.state.isGranted
    ) {
      this.setState((prevState) => ({
        code: codeDemo.substring(0, prevState.position + stepSize),
        position:
          codeDemo.length >= prevState.position + stepSize
            ? prevState.position + stepSize
            : 0,
      }));
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  startGame = () => {
    this.setState({
      isWelcome: false,
    });
  };

  render() {
    let isWelcome = this.state.isWelcome;
    return (
      <DivContainer id="container" className="hackertyper">
        {isWelcome ? (
          <Welcome startGame={this.startGame}></Welcome>
        ) : (
          <>
            <DivFade></DivFade>
            <DivTerminal id="terminal">{this.state.code}</DivTerminal>
          </>
        )}
        <DivPopups>
          {this.state.isDenied && (
            <DivPopDenied className="popup" id="access-denied">
              ACCESS DENIED
            </DivPopDenied>
          )}
          {this.state.isGranted && (
            <DivPopGranted className="popup" id="access-granted">
              ACCESS GRANTED
            </DivPopGranted>
          )}
        </DivPopups>
      </DivContainer>
    );
  }
}
