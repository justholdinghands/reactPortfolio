import "./Counter.css";
import Button from "./Button";
import React, { Component } from "react";
import pinkAxo from "./imgs/pink-axo-vertical.gif";
import whiteAxo from "./imgs/white-axo-side.gif";

type State = {
  count: number;
};

type Props = {
  className?: string;
};

export default class App extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  plus = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  minus = () => {
    this.setState({
      count: this.state.count - 1,
    });
  };

  render() {
    var { count } = this.state;
    return (
      <div id="main-div" className="counter">
        <img id="white-axo" src={whiteAxo} alt="white-axolotl"></img>
        <div id="count-div">
          <div id="talk">
            <h2>Counter:</h2>
          </div>
          <div id="btns-div">
            <Button
              whatClass="plus-btn"
              func={() => this.plus()}
              text="+"
            ></Button>
            {count}
            <Button
              whatClass="minus-btn"
              func={() => this.minus()}
              text="-"
            ></Button>
          </div>
        </div>
        <img id="pink-axo" src={pinkAxo} alt="pink-axolotl"></img>
      </div>
    );
  }
}
