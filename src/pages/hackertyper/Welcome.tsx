import { Component } from "react";
import { theme } from "../../theme";
import styled from "styled-components";

const DivWelcome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 800px;
  max-width: 80vw;
  max-height: 90%;
  height: 100%;

  div {
    max-height: 40vh;

    overflow: scroll;
    /* Hide scrollbar for Chrome, Safari and Opera */
    ::-webkit-scrollbar {
      display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

const H1 = styled.h1`
  font: 6vh ${theme.fonts.fontFamily2};
`;

const P = styled.p`
  width: 100%;
`;

const Button = styled.button`
  background-color: ${theme.colors.background};
  color: ${theme.colors.primary};
  border: 0.2rem solid ${theme.colors.primary};
  font: 2vh ${theme.fonts.fontFamily2};
  padding: 1em;
  z-index: 1;
  width: 100%;
  :hover {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.secondary};
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
        <H1>How To Use Hacker Typer</H1>
        <div>
          <P id="quick-start">{`Quick Start Instructions:
Start typing on the keyboard to 'code'. For mobile, just tap on your screen.`}</P>
          <P>{`How to get access granted in hacker typer?
Hit CTRL 3 times for "Access Granted"`}</P>
          <P>{`How to get access denied in hacker typer?
Hit CAPS LOCK 3 for "Access Denied"`}</P>
          <P>{`How can I clear access granted or access denied?
Hit ESCAPE to clear "Access Denied/Granted"`}</P>
        </div>
        <Button id="start-btn" onClick={this.props.startGame}>
          Start HackerTyping...
        </Button>
      </DivWelcome>
    );
  }
}
