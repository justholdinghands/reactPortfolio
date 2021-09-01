import { BlogComponent } from "./components/blog/Blog";
import { Component, useState } from "react";
import {
  Link,
  Route,
  RouteComponentProps,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";
import { withRouter } from "react-router";
import Counter from "./components/counter/Counter";
import Hackertyper from "./components/hackertyper/Hackertyper";
import MemoryGame from "./components/memoryGame/MemoryGame";
import TicTacToe from "./components/tictactoe/tictactoe";
import Todo from "./components/todo/Todo";
import styled from "styled-components";

const UlNav = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  list-style-type: none;
  font: bold 1.8em/150% ${theme.hackertyper.font};
`;

//prettier-ignore
export const blogRoutes = new RegExp('^\/blog\/*.*$');

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
        <div id="divRender">
          <nav>
            <UlNav>
              <li>
                <Link to="/counter" style={{ textDecoration: "none" }}>
                  Counter
                </Link>
              </li>
              <li>
                <Link to="/hackertyper" style={{ textDecoration: "none" }}>
                  Hacker Typer
                </Link>
              </li>
              <li>
                <Link to="/todo" style={{ textDecoration: "none" }}>
                  To Do List
                </Link>
              </li>
              <li>
                <Link to="/tictactoe" style={{ textDecoration: "none" }}>
                  Tic Tac Toe
                </Link>
              </li>
              <li>
                <Link to="/memoryGame" style={{ textDecoration: "none" }}>
                  Memory Game
                </Link>
              </li>
              <li>
                <Link to="/blog" style={{ textDecoration: "none" }}>
                  Blog
                </Link>
              </li>
            </UlNav>
          </nav>

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
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
