import { BlogComponent } from "./components/blog/Blog";
import { ChuckNorris } from "./components/chucknorris/ChuckNorris";
import { Component, useEffect, useState } from "react";
import {
  Link,
  Route,
  RouteComponentProps,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { Provider } from "react-redux";
import { ReduxCounter } from "./components/reduxCounter/ReduxCounter";
import { createGlobalStyle } from "styled-components";
import { store } from "./components/reduxCounter/store";
import { theme } from "./theme";
import { withRouter } from "react-router";
import Counter from "./components/counter/Counter";
import Hackertyper from "./components/hackertyper/Hackertyper";
import MemoryGame from "./components/memoryGame/MemoryGame";
import NavBottom from "./components/NavBottom/NavBottom";
import TabScrollerMenu from "./components/Navigation/TabScrollerMenu";

import {
  Button,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { UnknownAsyncThunkAction } from "@reduxjs/toolkit/dist/matchers";
import NavSidebar from "./components/NavSidebar/NavSidebar";
import NavbarMenu from "./components/Navigation/NavbarMenu";
import PropTypes from "prop-types";
import TicTacToe from "./components/tictactoe/tictactoe";
import Todo from "./components/todo/Todo";
import blog from "./icons/blog.png";
import chuck from "./icons/chucc.png";
import purpleAxo from "./icons/purpleAxo.png";
import redux from "./icons/redux.png";
import robot from "./icons/download.png";
import shark from "./icons/shark.png";
import styled from "styled-components";
import superwoman from "./icons/todowoman.png";
import xoxo from "./icons/xo.png";

const UlNav = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  list-style-type: none;
  position: fixed;
  border-right: 0.1em solid ${theme.global.borderColor};
  height: 100%;
  font: bold 1.8em/150% ${theme.hackertyper.fontPrimary};
  border: 10px blue solid;
  width: 300px;

  li {
    padding-left: 2%;
  }
`;

export const H1 = styled.h1`
  position: fixed;
  top: 6rem;
  font: 3rem ${theme.global.fontFamily1};
  color: ${theme.global.titleClr};
`;

export const DivIcon = styled.div`
  height: 10vw;
  width: 10vw;
  padding: 0;
  margin: 0;
  img {
    width: 100%;
  }
`;

export const DivImgWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const DivWrapper = styled.div`
  /* height: 100vh; */
  border: solid green 1px;
`;

const DivNavBottom = styled.div`
  /* position: absolute;
  bottom: 0;
  height: 10vh;
  border: blue solid 1px; */
`;

//prettier-ignore
export const blogRoutes = new RegExp('^\/blog\/*.*$');
export const chuckRoutes = new RegExp("^/chucknorris/*.*$");

const GlobalStyle = createGlobalStyle<{ bgcolor: string }>`
  body {
    background-color: ${(props) =>
      props.bgcolor === "/counter"
        ? theme.counter.background
        : props.bgcolor === "/hackertyper"
        ? theme.hackertyper.background
        : props.bgcolor === "/todo"
        ? theme.todo.background
        : props.bgcolor === "/tictactoe"
        ? theme.tictactoe.background
        : blogRoutes.test(props.bgcolor)
        ? theme.blog.background
        : props.bgcolor === "/memoryGame"
        ? theme.memoryGame.background
        : chuckRoutes.test(props.bgcolor)
        ? theme.chuck.background
        : ""};
    /* display: flex;
    flex-direction: column;
    justify-content: start;
    height: 100vh;
    width: 97vw; */
  }`;

function App /* class extends Component <RouteComponentProps<{ location: any }>> */(props: {}) {
  const [width, setWindowWidth] = useState(0);
  // function constructor(props) {
  //   super(props);
  // }
  // render() {
  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const responsive = {
    isDesktop: width > 992, // == showTopNavMenu in  mars-inline
  };

  return (
    <Container
      fluid
      className="gy-0 mh-100 overflow-hidden"
      style={{
        height: "100vh",
        background: `${theme.global.globalBg}`,
        padding: 0,
        flex: 1,
        minHeight: 0,
        minWidth: 0,
      }}
    >
      <Row className="h-25 gx-0">
        <Row className="gx-0">
          <NavbarMenu></NavbarMenu>
          <TabScrollerMenu></TabScrollerMenu>
          {/* d-none dokym nie active skills tab v NavbarMenu */}
        </Row>
      </Row>
      {/* <Col className="fixed-left">
        <NavSidebar {...responsive}></NavSidebar>
      </Col> */}
      <Row
        className="d-flex justify-content-center align-items-center h-75 w-100 gx-0" /** background: "skyblue" */
      >
        {/* <GlobalStyle bgcolor={//this.props. props.location.pathname} /> */}
        <Col className="d-flex justify-content-center h-100">
          <Switch>
            <Route path="/counter">
              <Col className="gx-0 h-100 align-items-center">
                <Row className="w-100 gx-0 h-100 align-items-center justify-content-center">
                  <Counter></Counter>
                </Row>
              </Col>
            </Route>
            <Route path="/hackertyper">
              <H1>Hackertyper</H1>
              <Hackertyper></Hackertyper>
            </Route>
            <Route path="/todo">
              <Col className="gx-0 h-100 align-items-center">
                <Row className="w-100 gx-0 h-100 align-items-center justify-content-center">
                  <Todo></Todo>
                </Row>
              </Col>
            </Route>
            <Route path="/tictactoe">
              <H1>Tic-Tac-Toe</H1>
              <TicTacToe></TicTacToe>
            </Route>
            <Route path="/memoryGame">
              <H1>Memory Game</H1>
              <MemoryGame></MemoryGame>
            </Route>
            <Route path="/blog">
              <H1>Blog</H1>
              <BlogComponent></BlogComponent>
            </Route>
            <Route path="/redux">
              <H1>Redux Counter</H1>
              <Provider store={store}>
                <ReduxCounter></ReduxCounter>
              </Provider>
            </Route>
            <Route path="/chucknorris">
              <H1>Joke Generator</H1>
              <ChuckNorris></ChuckNorris>
            </Route>
            <Route exact path="/">
              Home component
            </Route>
            <Route path="*">404 Component</Route>
          </Switch>
        </Col>
      </Row>
      {/* <Row className="d-block d-lg-none">
        className="position-absolute w-100 h-25"
        <NavBottom {...responsive}></NavBottom>
      </Row> */}
      {/** vyskusat bootstrapovsku classu d-none */}
    </Container>
  );
  // }
}

export default withRouter(App);
