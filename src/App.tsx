import { Component } from "react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";
import { withRouter } from "react-router";
import Hackertyper from "./components/hackertyper/Hackertyper";
import styled from "styled-components";

const DivRender = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 100vh;
  width: 97vw;
  white-space: pre;
  line-height: 2rem;
`;

const UlNav = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  list-style-type: none;
  font: bold 1.8em/150% ${theme.hackertyper.font};
`;

const GlobalStyle = createGlobalStyle<{ bgcolor: string }>`
  body {
    background-color: ${(props) =>
      props.bgcolor === "/counter"
        ? theme.counter.background
        : props.bgcolor === "/hackertyper"
        ? theme.hackertyper.background
        : props.bgcolor === "/todo"
        ? theme.todo.background
        : ""};
}`;
class App extends Component<{ location: any }> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <GlobalStyle bgcolor={this.props.location.pathname} />
        <DivRender id="divRender">
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
            </UlNav>
          </nav>

          <Switch>
            <Route path="/counter">
              {/* <Counter></Counter> */}
              <h1>Future Counter</h1>
            </Route>
            <Route path="/hackertyper">
              <Hackertyper></Hackertyper>
            </Route>
            <Route path="/todo">
              {/* <Todo>todos</Todo> */}
              <h1>Future TODO</h1>
            </Route>
          </Switch>
        </DivRender>
      </div>
    );
  }
}

export default withRouter(App);
