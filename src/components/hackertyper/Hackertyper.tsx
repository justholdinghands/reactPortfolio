import "./Hackertyper.css";
// import { codeDemo } from "./code";
import React, { Component } from "react";
import Welcome from "./components/Welcome";
import styled from "styled-components";

let codeDemo = "";

const DivContainer = styled.div`
  background-color: var(--ht_bkg);
  color: var(--ht_primary);
  font-family: var(--ht_font);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DivTerminal = styled.div`
  width: 100%;
`;

const DivPopup = styled.div`
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
    this.isStart = this.isStart.bind(this);
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

    if (e.keyCode === 18) {
      // ALT
      this.setState({
        altCnt: this.state.altCnt + 1,
      });
      if (this.state.altCnt === 2) {
        this.setState({
          isGranted: true,
          isDenied: false,
          altCnt: 0,
          clCnt: 0,
        });
      }
    } else if (e.keyCode === 20) {
      // CAPS-LOCK
      this.setState({
        clCnt: this.state.clCnt + 1,
      });
      if (this.state.clCnt === 3) {
        this.setState({
          isDenied: true,
          isGranted: false,
          clCnt: 0,
          altCnt: 0,
        });
      }
    } else if (e.keyCode === 27) {
      // ESC
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

    if (e.keyCode === 8) {
      // BACKSPACE
      var i = this.state.position - 3 < 0 ? 0 : this.state.position - 3;
      this.setState({
        code: codeDemo.substring(0, i),
        position: i,
      });
    } else if (e.keyCode !== 18 && e.keyCode !== 20 && e.keyCode !== 27) {
      this.setState({
        code: codeDemo.substring(0, this.state.position + 3),
        position:
          codeDemo.length >= this.state.position + 3
            ? this.state.position + 3
            : 0,
      });
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  isStart = () => {
    this.setState({
      isWelcome: false,
    });
  };

  render() {
    var showWelcome = this.state.isWelcome;
    return (
      <DivContainer id="container" className="hackertyper">
        {showWelcome ? (
          <Welcome isStart={this.isStart}></Welcome>
        ) : (
          <DivTerminal id="terminal">{this.state.code}</DivTerminal>
        )}
        {this.state.isDenied ? (
          <DivPopup className="popup" id="access-denied">
            ACCESS DENIED
          </DivPopup>
        ) : (
          ""
        )}
        {this.state.isGranted ? (
          <DivPopup className="popup" id="access-granted">
            ACCESS GRANTED
          </DivPopup>
        ) : (
          ""
        )}
      </DivContainer>
    );
  }
}
