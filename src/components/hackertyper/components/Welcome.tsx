import { theme } from "../../../theme";
import React, { Component } from "react";
import styled from "styled-components";

//styled-components
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

const Div = styled.div`
  white-space: pre;
  line-height: 2rem;
`;

const Button = styled.button`
  margin-top: 5rem;
  height: 4em;
  width: 14em;
  font-size: large;
  background-color: ${theme.ht_bkg};
  color: ${theme.ht_primary};
  border: 1px solid ${theme.ht_hover};

  :hover {
    background-color: ${theme.ht_hover};
    cursor: pointer;
  }
`;

type Props = {
  isStart: () => void;
};

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
