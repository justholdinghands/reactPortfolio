import { Container, Nav, Navbar, Row } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import AppsIcon from "@mui/icons-material/Apps";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";

function NavbarMenu() {
  return (
    <Container fluid className="w-100 px-0">
      <Row className="py-2 gx-0" style={{ background: "black" }}></Row>
      <Navbar
        className="px-3 justify-content-between h-75"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Navbar.Brand>
          <Link to="/" className="fs-3">
            Me
          </Link>
        </Navbar.Brand>
        <Nav className="nav flex-row justify-content-around fs-3">
          <NavLink to="/" className="d-flex flex-row">
            <AppsIcon />
            <Navbar.Collapse>My Work</Navbar.Collapse>
          </NavLink>
          <NavLink to="/" className="d-flex flex-row">
            <AttachFileIcon />
            <Navbar.Collapse>Resume</Navbar.Collapse>
          </NavLink>
          <NavLink to="/" className="d-flex flex-row">
            <PhoneInTalkIcon />
            <Navbar.Collapse>Contact Me</Navbar.Collapse>
          </NavLink>

          {/* <Nav.Link to="">
            <Navbar.Collapse></Navbar.Collapse>
          </Nav.Link>
          <Nav.Link to="">
            <Navbar.Collapse></Navbar.Collapse>
          </Nav.Link> */}
        </Nav>
      </Navbar>
    </Container>
  );
}

export default NavbarMenu;
