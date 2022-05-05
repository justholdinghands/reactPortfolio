import { BlogComponent } from "./components/blog/Blog";
import { ChuckNorris } from "./components/chucknorris/ChuckNorris";
import { Provider } from "react-redux";
import { ReduxCounter } from "./components/reduxCounter/ReduxCounter";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { store } from "./components/reduxCounter/store";
import { theme } from "./theme";
import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import Contacts from "./components/Contacts";
import Counter from "./components/counter/Counter";
import Hackertyper from "./components/hackertyper/Hackertyper";
import Hello from "./components/Hello";
import NavbarMenu from "./components/Navigation/NavbarMenu";
import TabScrollerMenu from "./components/Navigation/TabScrollerMenu";
import TicTacToe from "./components/tictactoe/tictactoe";
import Todo from "./components/todo/Todo";
import styled from "styled-components";

export const MAX_APP_WIDTH = "853px";

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  background: ${theme.colors.globalBg};
  overflow: hidden;
`;

const DivNavbar = styled.div`
  position: relative;
  height: 20%;
  width: 100%;
`;

const DivAppRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 100%;
  max-width: 853px;
`;

export const DivImgWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

function App(props: {}) {
  const [width, setWindowWidth] = useState(0);
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
    isDesktop: width > 992,
  };

  return (
    <DivContainer>
      <DivNavbar>
        <NavbarMenu></NavbarMenu>
        <TabScrollerMenu></TabScrollerMenu>
      </DivNavbar>

      <DivAppRow>
        <Switch>
          <Route exact path="/hello">
            <Hello />
          </Route>
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
          <Route exact path="/contacts">
            <Contacts />
          </Route>
          <Route path="*">404 Component</Route>
        </Switch>
      </DivAppRow>
    </DivContainer>
  );
}
export default withRouter(App);
