import { theme } from "../theme";
import styled from "styled-components";

const DivContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-width: 90vw;
  font-family: ${theme.fonts.fontFamily2};
  color: ${theme.colors.primaryFaded};

  h1 {
    font-size: 5rem;
    font-weight: 800;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    word-wrap: break-word;
  }

  a {
    font-size: 1.8rem;
    font-weight: 400;
    text-decoration: none;
    color: ${theme.colors.primaryFaded};
  }

  a:hover {
    color: ${theme.colors.primary};
    cursor: pointer;
  }
`;

function Contacts() {
  return (
    <DivContainer>
      <div>
        <h1>Let&apos;s get in touch! </h1>
        <a
          href="https://linkedin.com/in/simaskova"
          target="_blank"
          rel="noreferrer noopener"
        >
          linkedin.com/in/simaskova
        </a>
        <a
          href="https://github.com/simaskova"
          target="_blank"
          rel="noreferrer noopener"
        >
          github.com/simaskova
        </a>
        <a
          href="https://codepen.io/simaskova"
          target="_blank"
          rel="noreferrer noopener"
        >
          codepen.io/simaskova
        </a>
      </div>
    </DivContainer>
  );
}

export default Contacts;
