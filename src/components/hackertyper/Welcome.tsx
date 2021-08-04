import { theme } from "../../theme";
import React, { Component } from "react";
import styled from "styled-components";

type Props = {
  isStart: () => void;
};

const DivWelcome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
`;

const H1 = styled.h1`
  width: 100%;
`;

const P = styled.p`
  width: 100%;
`;

const Button = styled.button`
  margin-top: 5rem;
  height: 4em;
  width: 14em;
  font-size: large;
  background-color: ${theme.hackertyper.background};
  color: ${theme.hackertyper.primary};
  border: 1px solid ${theme.hackertyper.hover};
`;

export default class Welcome extends Component<Props> {
  render() {
    return (
      <DivWelcome id="welcome-container">
        <H1>How To Use Hacker Typer</H1>
        <P id="quick-start">{`Quick Start Instructions:
Start typing on the keyboard to 'code'. For mobile, just tap on your screen.`}</P>
        <P>{`How to get access granted in hacker typer?
Hit ALT 3 times for "Access Granted"

How to get access denied in hacker typer?
Hit CAPS LOCK 3 for "Access Denied"
How can I clear access granted or access denied?
Hit ESCAPE to clear "Access Denied/Granted"`}</P>
        <Button id="start-btn" onClick={this.props.isStart}>
          Start HackerTyping...
        </Button>
      </DivWelcome>
    );
  }
}
