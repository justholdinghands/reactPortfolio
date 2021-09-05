import { Component } from "react";
import { theme } from "../../theme";
import styled from "styled-components";

const DivWelcome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
  height: 98vh;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
    height: 50%;
  }
`;

const H1 = styled.h1`
  font: 4em ${theme.hackertyper.fontSecondary};
  width: 100%;
`;

const P = styled.p`
  width: 100%;
`;

const Button = styled.button`
  margin-top: 5rem;
  width: 35rem;
  background-color: ${theme.hackertyper.background};
  color: ${theme.hackertyper.primary};
  border: 0.2rem solid ${theme.hackertyper.hover};
  font: 2em ${theme.hackertyper.fontSecondary};
  padding: 1em;
  z-index: 1;
  :hover {
    background-color: ${theme.hackertyper.hover};
    cursor: pointer;
  }
`;

type Props = {
  startGame: () => void;
};

export default class Welcome extends Component<Props> {
  render() {
    return (
      <DivWelcome id="welcome-container">
        <div>
          <H1>How To Use Hacker Typer</H1>
          <P id="quick-start">{`Quick Start Instructions:
Start typing on the keyboard to 'code'. For mobile, just tap on your screen.`}</P>
          <P>{`How to get access granted in hacker typer?
Hit ALT 3 times for "Access Granted"

How to get access denied in hacker typer?
Hit CAPS LOCK 3 for "Access Denied"
How can I clear access granted or access denied?
Hit ESCAPE to clear "Access Denied/Granted"`}</P>
          <Button id="start-btn" onClick={this.props.startGame}>
            Start HackerTyping...
          </Button>
        </div>
      </DivWelcome>
    );
  }
}
