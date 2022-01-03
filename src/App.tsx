import { BlogComponent } from "./components/blog/Blog";
import { ChuckNorris } from "./components/chucknorris/ChuckNorris";
import { Component, useState } from "react";
import {
  Link,
  Route,
  RouteComponentProps,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { Provider } from "react-redux";
import { ReduxCounter } from "./components/reduxCounter/ReduxCounter";
import { createGlobalStyle } from "styled-components";
import { store } from "./components/reduxCounter/store";
import { theme } from "./theme";
import { withRouter } from "react-router";
import Counter from "./components/counter/Counter";
import Hackertyper from "./components/hackertyper/Hackertyper";
import MemoryGame from "./components/memoryGame/MemoryGame";
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

const DivWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
`;

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

export const DivIcon = styled.div`
  margin-left: 0.1em;
  margin-right: 0.1em;
  height: 1.2em;
  width: 1.2em;

  img {
    width: 100%;
  }
`;

const DivImgWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const DivSwitch = styled.div`
  position: absolute;
  width: calc(100% - 300px);
  height: 100%;
  right: 0;
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
    display: flex;
    flex-direction: column;
    justify-content: start;
    height: 100vh;
    width: 97vw;
  }`;
class App extends Component<RouteComponentProps<{ location: any }>> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <GlobalStyle bgcolor={this.props.location.pathname} />
        <DivWrapper id="divRender">
          <Navbar bg="dark">
            <li>
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
          </Navbar>
          <DivSwitch>
            <Switch>
              <Route path="/counter">
                <Counter></Counter>
              </Route>
              <Route path="/hackertyper">
                <Hackertyper></Hackertyper>
              </Route>
              <Route path="/todo">
                <Todo></Todo>
              </Route>
              <Route path="/tictactoe">
                <TicTacToe></TicTacToe>
              </Route>
              <Route path="/memoryGame">
                <MemoryGame></MemoryGame>
              </Route>
              <Route path="/blog">
                <BlogComponent></BlogComponent>
              </Route>
              <Route path="/redux">
                <Provider store={store}>
                  <ReduxCounter></ReduxCounter>
                </Provider>
              </Route>
              <Route path="/chucknorris">
                <ChuckNorris></ChuckNorris>
              </Route>
            </Switch>
          </DivSwitch>
        </DivWrapper>
      </div>
    );
  }
}

export default withRouter(App);
