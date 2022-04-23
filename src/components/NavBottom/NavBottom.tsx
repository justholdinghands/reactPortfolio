import {
  Container,
  Nav,
  NavItem,
  Navbar,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { DivIcon, DivImgWrap } from "../../App";
import { NavLink } from "react-router-dom";
import { theme } from "../../theme";
import blog from "../../icons/blog.png";
import chuck from "../../icons/chucc.png";
import purpleAxo from "../../icons/purpleAxo.png";
import redux from "../../icons/redux.png";
import robot from "../../icons/download.png";
import shark from "../../icons/shark.png";
import styled from "styled-components";
import superwoman from "../../icons/todowoman.png";
import xoxo from "../../icons/xo.png";

const Ul = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

interface Props {
  isDesktop: boolean;
}

function NavBottom(props: Props) {
  const showContainer = {
    display: props.isDesktop ? "none" : "block",
    width: "auto",
    "max-width": "none",
  };

  const showNav = {
    width: "auto",
    "max-width": "none",
    height: "100%",
  };

  const hoverIcon = {};

  return (
    // TODO: responsively fit only icons that fit, others to scllable area
    <Navbar
      fixed="bottom"
      color="light"
      className="overflow-scroll"
      style={{
        width: "auto",
        height: "10%",
        padding: "0",
        margin: "0",
        background: `${theme.global.defaultBg}`,
      }}
    >
      <Container fluid className="overflow-hide" style={showContainer}>
        <Row className="overflow-scroll gx-50 p-0 h-100">
          {/**className="position-relative align-items-center" */}
          <Nav
            className="no-wrap justify-content-evenly align-items-center gap-5"
            style={showNav}
          >
            {/**className="justify-content-between" */}
            <NavItem>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Counter</Tooltip>}
                trigger="hover"
              >
                <li className="">
                  <NavLink to="/counter" style={{ textDecoration: "none" }}>
                    <DivImgWrap>
                      <DivIcon>
                        <img src={purpleAxo} alt="purple axo" />
                      </DivIcon>
                    </DivImgWrap>
                  </NavLink>
                </li>
              </OverlayTrigger>
            </NavItem>
            <NavItem>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Hacker Typer</Tooltip>}
                trigger="hover"
              >
                <li>
                  <NavLink to="/hackertyper" style={{ textDecoration: "none" }}>
                    <DivImgWrap>
                      <DivIcon>
                        <img src={robot} alt="robot axo" />
                      </DivIcon>
                    </DivImgWrap>
                  </NavLink>
                </li>
              </OverlayTrigger>
            </NavItem>
            <NavItem>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>To Do List</Tooltip>}
                trigger="hover"
              >
                <li>
                  <NavLink to="/todo" style={{ textDecoration: "none" }}>
                    <DivImgWrap>
                      <DivIcon>
                        <img src={superwoman} alt="superwoman" />
                      </DivIcon>
                    </DivImgWrap>
                  </NavLink>
                </li>
              </OverlayTrigger>
            </NavItem>
            <NavItem>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Tic Tac Toe</Tooltip>}
                trigger="hover"
              >
                <li>
                  <NavLink to="/tictactoe" style={{ textDecoration: "none" }}>
                    <DivImgWrap>
                      <DivIcon>
                        <img src={xoxo} alt="xoxo" />
                      </DivIcon>
                    </DivImgWrap>
                  </NavLink>
                </li>
              </OverlayTrigger>
            </NavItem>
            <NavItem>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Memory Game</Tooltip>}
                trigger="hover"
              >
                <li>
                  <NavLink to="/memoryGame" style={{ textDecoration: "none" }}>
                    <DivImgWrap>
                      <DivIcon>
                        <img src={shark} alt="shark" />
                      </DivIcon>
                    </DivImgWrap>
                  </NavLink>
                </li>
              </OverlayTrigger>
            </NavItem>
            <NavItem>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Blog</Tooltip>}
                trigger="hover"
              >
                <li>
                  <NavLink to="/blog" style={{ textDecoration: "none" }}>
                    <DivImgWrap>
                      <DivIcon>
                        <img src={blog} alt="blog" />
                      </DivIcon>
                    </DivImgWrap>
                  </NavLink>
                </li>
              </OverlayTrigger>
            </NavItem>
            <NavItem>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Redux Counter</Tooltip>}
                trigger="hover"
              >
                <li>
                  <NavLink to="/redux" style={{ textDecoration: "none" }}>
                    <DivImgWrap>
                      <DivIcon>
                        <img src={redux} alt="redux" />
                      </DivIcon>
                    </DivImgWrap>
                  </NavLink>
                </li>
              </OverlayTrigger>
            </NavItem>
            <NavItem>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Chuck Norris</Tooltip>}
                trigger="hover"
              >
                <li>
                  <NavLink to="/chucknorris" style={{ textDecoration: "none" }}>
                    <DivImgWrap>
                      <DivIcon>
                        <img src={chuck} alt="chucknorris" />
                      </DivIcon>
                    </DivImgWrap>
                  </NavLink>
                </li>
              </OverlayTrigger>
            </NavItem>
          </Nav>
        </Row>
      </Container>
    </Navbar>
  );
}

export default NavBottom;
