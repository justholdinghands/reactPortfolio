import "./Hackertyper.css";
// import { codeDemo } from "./code";
import { theme } from "./../../theme";
import React, { Component } from "react";
import Welcome from "./Welcome";
import styled from "styled-components";

let codeDemo = "";

const DivContainer = styled.div`
  background-color: ${theme.ht_background};
  color: ${theme.ht_font};
  font-family: ${theme.ht_font};
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
  count: number;
  key: string;
  isDenied: boolean;
  isGranted: boolean;
  altcount: number;
  clcount: number;
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
      count: 0,
      key: "",
      isDenied: false,
      isGranted: false,
      altcount: 0,
      clcount: 0,
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
        altcount: this.state.altcount + 1,
      });
      if (this.state.altcount === 2) {
        this.setState({
          isGranted: true,
          isDenied: false,
          altcount: 0,
          clcount: 0,
        });
      }
    } else if (e.keyCode === 20) {
      // CAPS-LOCK
      this.setState({
        clcount: this.state.clcount + 1,
      });
      if (this.state.clcount === 3) {
        this.setState({
          isDenied: true,
          isGranted: false,
          clcount: 0,
          altcount: 0,
        });
      }
    } else if (e.keyCode === 27) {
      // ESC
      this.setState({
        isDenied: false,
        isGranted: false,
        altcount: 0,
        clcount: 0,
      });
    } else {
      this.setState({
        altcount: 0,
        clcount: 0,
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
