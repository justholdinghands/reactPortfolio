import { Component } from "react";
import { codeDemo } from "./code";
import { theme } from "../../theme";
import Welcome from "./Welcome";
import styled from "styled-components";

//styled-components definition
const DivContainer = styled.div`
  background-color: ${theme.hackertyper.background};
  color: ${theme.hackertyper.primary};
  font-family: ${theme.hackertyper.fontPrimary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  ::-webkit-scrollbar {
    width: 0;
  }
`;

const DivTerminal = styled.div`
  padding-left: 5em;
  width: 98vh;
  white-space: pre;
  height: 100%;
  line-height: 2rem;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0;
  }
`;

const DivPopups = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
`;

const DivPopDenied = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vh;
  width: 20em;
  justify-content: center;
  align-items: center;
  font: 2em ${theme.hackertyper.fontSecondary};
  border: 0.5vh solid ${theme.hackertyper.denied};
  background-color: ${theme.hackertyper.backgroundDenied};
  color: ${theme.hackertyper.denied};
`;

const DivPopGranted = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vh;
  width: 20em;
  justify-content: center;
  align-items: center;
  font: 2em ${theme.hackertyper.fontSecondary};
  border: 0.5vh solid ${theme.hackertyper.primary};
  background-color: ${theme.hackertyper.backgroundGranted};
  color: ${theme.hackertyper.primary};
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

const stepSize = 3;

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
          <DivTerminal id="terminal">{this.state.code}</DivTerminal>
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
