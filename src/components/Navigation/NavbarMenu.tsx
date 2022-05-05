import { Container, Nav, Navbar, Row } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { theme } from "../../theme";
import MessageIcon from "@mui/icons-material/Message";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  background: ${theme.colors.primaryFaded};
  padding: 0;
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 0 5px;
    font-size: 1rem;

    :hover {
      color: ${theme.colors.white};
    }

    svg {
      margin: 0 5px;
    }
  }
`;

function NavbarMenu() {
  return (
    <StyledContainer fluid>
      <Row style={{ background: `${theme.colors.primaryFaded}` }}></Row>
      <Navbar
        className="px-3 justify-content-between h-75 align-center"
        collapseOnSelect
        expand="lg"
      >
        <Navbar.Brand>
          <Link to="/hello" className="fs-3">
            simaskova
          </Link>
        </Navbar.Brand>
        <Nav className="nav flex-row justify-content-around fs-3">
          <NavLink to="/contacts" className="d-flex flex-row">
            <MessageIcon />
            <Navbar.Collapse>Contact</Navbar.Collapse>
          </NavLink>
        </Nav>
      </Navbar>
    </StyledContainer>
  );
}

export default NavbarMenu;
