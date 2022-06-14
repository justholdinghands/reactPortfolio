import { BlogComponent } from "./pages/blog/Blog";
import { ChuckNorris } from "./pages/chucknorris/ChuckNorris";
import { Provider } from "react-redux";
import { ReduxCounter } from "./pages/reduxCounter/ReduxCounter";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { store } from "./pages/reduxCounter/store";
import { theme } from "./theme";
import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import Contacts from "./components/Contacts";
import Counter from "./pages/counter/Counter";
import Hackertyper from "./pages/hackertyper/Hackertyper";
import Hello from "./components/Hello";
import NavbarMenu from "./components/Navigation/NavbarMenu";
import NotFound from "./components/NotFound";
import TabScrollerMenu from "./components/Navigation/TabScrollerMenu";
import TicTacToe from "./pages/tictactoe/tictactoe";
import Todo from "./pages/todo/Todo";
import styled from "styled-components";

export const MAX_APP_WIDTH = "853px";

const DivContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  z-index: 1;
  background: ${theme.colors.globalBg};
  overflow: hidden;
`;

const DivNavbar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 15%;
  width: 100%;
`;

const DivAppRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  height: 85%;
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
          <Route exact path="/">
            <Hello />
          </Route>
          <Route path="/counter">
            <Counter />
          </Route>
          <Route path="/hackertyper">
            <Hackertyper />
          </Route>
          <Route path="/todo">
            <Todo />
          </Route>
          <Route path="/tictactoe">
            <TicTacToe />
          </Route>
          <Route path="/blog">
            <BlogComponent />
          </Route>
          <Route path="/redux">
            <Provider store={store}>
              <ReduxCounter />
            </Provider>
          </Route>
          <Route path="/chucknorris">
            <ChuckNorris />
          </Route>
          <Route exact path="/contacts">
            <Contacts />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </DivAppRow>
    </DivContainer>
  );
}
export default withRouter(App);
