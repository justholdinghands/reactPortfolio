import "./Hackertyper.css";
import { codeDemo } from "./code";
import { theme } from "../../theme";
import React, { Component } from "react";
import Welcome from "./Welcome";
import styled from "styled-components";

//styled-components definition
const DivContainer = styled.div`
  background-color: ${theme.ht_bkg};
  color: ${theme.ht_primary};
  font-family: ${theme.ht_font};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ::-webkit-scrollbar {
    width: 0;
  }
`;

const DivTerminal = styled.div`
  padding-left: 5em;
  width: 100%;
  white-space: pre;
  line-height: 2rem;

  ::-webkit-scrollbar {
    width: 0;
  }
`;

const DivPopDenied = styled.div`
  display: flex;
  position: fixed;
  height: 15vh;
  width: 30vw;
  top: 40%;
  left: 35%;
  justify-content: center;
  align-items: center;
  font-size: 3vw;
  font-weight: bolder;
  border: 0.5vh solid ${theme.ht_denied};
  background-color: ${theme.ht_bkg_denied};
  color: ${theme.ht_denied};
`;

const DivPopGranted = styled.div`
  display: flex;
  position: fixed;
  height: 15vh;
  width: 30vw;
  top: 40%;
  left: 35%;
  justify-content: center;
  align-items: center;
  font-size: 3vw;
  font-weight: bolder;
  border: 0.5vh solid ${theme.ht_primary};
  background-color: ${theme.ht_bkg_granted};
  color: ${theme.ht_primary};
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
      if (this.state.altCnt === 2) {
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
      if (this.state.clCnt === 3) {
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
      var i = this.state.position - 3 < 0 ? 0 : this.state.position - 3;
      this.setState((prevState) => ({
        code: codeDemo.substring(0, i),
        position: prevState.position - 3 < 0 ? 0 : prevState.position - 3,
      }));
    } else if (e.keyCode !== 18 && e.keyCode !== 20 && e.keyCode !== 27) {
      this.setState((prevState) => ({
        code: codeDemo.substring(0, prevState.position + 3),
        position:
          codeDemo.length >= prevState.position + 3
            ? prevState.position + 3
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
    var isWelcome = this.state.isWelcome;
    return (
      <DivContainer id="container" className="hackertyper">
        {isWelcome ? (
          <Welcome startGame={this.startGame}></Welcome>
        ) : (
          <DivTerminal id="terminal">{this.state.code}</DivTerminal>
        )}
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
      </DivContainer>
    );
  }
}
