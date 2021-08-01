import React, { Component } from "react";

type Props = {
  isStart: () => void;
};

export default class Welcome extends Component<Props> {
  render() {
    return (
      <div id="welcome-container">
        <h1>How To Use Hacker Typer</h1>
        <p id="quick-start">{`Quick Start Instructions:
Start typing on the keyboard to 'code'. For mobile, just tap on your screen.`}</p>
        <p>{`How to get access granted in hacker typer?
Hit ALT 3 times for "Access Granted"

How to get access denied in hacker typer?
Hit CAPS LOCK 3 for "Access Denied"
How can I clear access granted or access denied?
Hit ESCAPE to clear "Access Denied/Granted"`}</p>
        <button id="start-btn" onClick={this.props.isStart}>
          Start HackerTyping...
        </button>
      </div>
    );
  }
}
