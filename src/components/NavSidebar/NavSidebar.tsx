import { Link } from "react-router-dom";
import { ReactPropTypes } from "react";
import App, { DivIcon } from "../../App";
import PropTypes from "prop-types";
import blog from "../../icons/blog.png";
import chuck from "../../icons/chucc.png";
import purpleAxo from "../../icons/purpleAxo.png";
import redux from "../../icons/redux.png";
import robot from "../../icons/download.png";
import shark from "../../icons/shark.png";
import styled from "styled-components";
import superwoman from "../../icons/todowoman.png";
import xoxo from "../../icons/xo.png";

const DivImgWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

interface Props {
  isDesktop: boolean;
}

function NavSidebar(props: Props) {
  // ked props = false display: block
  console.log("NavSidebar - props", props.valueOf());

  const showNav = {
    display: props.isDesktop ? "flex" : "none",
  };

  return (
    <div className="" style={showNav}>
      <p>SHOWING SIDEBAR</p>
      <div className="">
        <ul>
          <li className="">
            <Link to="/counter" style={{ textDecoration: "none" }}>
              <DivImgWrap>
                <DivIcon>
                  <img src={purpleAxo} alt="purple axo" />
                </DivIcon>
                Counter
              </DivImgWrap>
            </Link>
          </li>
          <li>
            <Link to="/hackertyper" style={{ textDecoration: "none" }}>
              <DivImgWrap>
                <DivIcon>
                  <img src={robot} alt="robot axo" />
                </DivIcon>
                Hacker Typer
              </DivImgWrap>
            </Link>
          </li>
          <li>
            <Link to="/todo" style={{ textDecoration: "none" }}>
              <DivImgWrap>
                <DivIcon>
                  <img src={superwoman} alt="superwoman" />
                </DivIcon>
                To Do List
              </DivImgWrap>
            </Link>
          </li>
          <li>
            <Link to="/tictactoe" style={{ textDecoration: "none" }}>
              <DivImgWrap>
                <DivIcon>
                  <img src={xoxo} alt="xoxo" />
                </DivIcon>
                Tic Tac Toe
              </DivImgWrap>
            </Link>
          </li>
          <li>
            <Link to="/memoryGame" style={{ textDecoration: "none" }}>
              <DivImgWrap>
                <DivIcon>
                  <img src={shark} alt="shark" />
                </DivIcon>
                Memory Game
              </DivImgWrap>
            </Link>
          </li>
          <li>
            <Link to="/blog" style={{ textDecoration: "none" }}>
              <DivImgWrap>
                <DivIcon>
                  <img src={blog} alt="blog" />
                </DivIcon>
                Blog
              </DivImgWrap>
            </Link>
          </li>
          <li>
            <Link to="/redux" style={{ textDecoration: "none" }}>
              <DivImgWrap>
                <DivIcon>
                  <img src={redux} alt="redux" />
                </DivIcon>
                Redux counter
              </DivImgWrap>
            </Link>
          </li>
          <li>
            <Link to="/chucknorris" style={{ textDecoration: "none" }}>
              <DivImgWrap>
                <DivIcon>
                  <img src={chuck} alt="chucknorris" />
                </DivIcon>
                Chuck Norris
              </DivImgWrap>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavSidebar;
