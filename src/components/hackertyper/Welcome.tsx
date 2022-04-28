import { Component } from "react";
import { theme } from "../../theme";
import styled from "styled-components";

const DivWelcome = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2vw;
`;

const H1 = styled.h1`
  font: 6vw ${theme.hackertyper.fontSecondary};
`;

const P = styled.p`
  width: 100%;
`;

const Button = styled.button`
  background-color: ${theme.hackertyper.background};
  color: ${theme.hackertyper.primary};
  border: 0.2rem solid ${theme.hackertyper.primary};
  font: 2vw ${theme.hackertyper.fontSecondary};
  padding: 1em;
  z-index: 1;
  :hover {
    background-color: ${theme.hackertyper.primary};
    color: ${theme.hackertyper.secondary};
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
        </div>
        <Button id="start-btn" onClick={this.props.startGame}>
          Start HackerTyping...
        </Button>
      </DivWelcome>
    );
  }
}
