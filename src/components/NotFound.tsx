import { Link } from "react-router-dom";
import { RiArrowGoBackLine } from "react-icons/ri";
import { theme } from "../theme";
import styled from "styled-components";

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 30%;
  max-width: 90vw;
  font-family: ${theme.fonts.fontFamily2};
  color: ${theme.colors.primaryFaded};

  h1 {
    font-size: 5rem;
    font-weight: 800;
  }
  p {
    font-size: 2rem;
    font-weight: 400;

    a {
      vertical-align: baseline;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      color: ${theme.colors.primaryFaded};

      :hover {
        color: ${theme.colors.primary};
      }
    }
  }
`;
function NotFound() {
  return (
    <DivContainer>
      <h1>Oops, that didn&apos;t work :( </h1>
      <p>
        <Link to="/">
          Go back <RiArrowGoBackLine />
        </Link>
      </p>
    </DivContainer>
  );
}

export default NotFound;
