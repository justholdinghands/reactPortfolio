import "./Hackertyper.css";
import { codeDemo } from "./code";
import React, { Component } from "react";
import Welcome from "./components/Welcome";

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

  //   counter = (e) => {
  // this.setState({
  //   cnt: this.cnt + 1,
  //   key: e,
  // });
  //   };

  render() {
    var showWelcome = this.state.isWelcome;
    return (
      <div id="container" className="hackertyper">
        {showWelcome ? (
          <Welcome isStart={this.isStart}></Welcome>
        ) : (
          <div id="terminal">{this.state.code}</div>
        )}
        {this.state.isDenied ? (
          <div className="popup" id="access-denied">
            ACCESS DENIED
          </div>
        ) : (
          ""
        )}
        {this.state.isGranted ? (
          <div className="popup" id="access-granted">
            ACCESS GRANTED
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
