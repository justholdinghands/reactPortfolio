import { BlogComponent } from "./components/blog/Blog";
import { ChuckNorris } from "./components/chucknorris/ChuckNorris";
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
import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import Counter from "./components/counter/Counter";
import Hackertyper from "./components/hackertyper/Hackertyper";
// import MemoryGame from "./components/memoryGame/MemoryGame";
import NavbarMenu from "./components/Navigation/NavbarMenu";
import TabScrollerMenu from "./components/Navigation/TabScrollerMenu";
import TicTacToe from "./components/tictactoe/tictactoe";
import Todo from "./components/todo/Todo";
import styled from "styled-components";

export const DivIcon = styled.div`
  margin: 0;
  padding: 0;
  height: 10vw;
  width: 10vw;
  img {
    width: 100%;
  }
`;

export const DivImgWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const DivContainer = styled.div`
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  background: ${theme.global.globalBg};
  overflow: hidden;
  border: 2px solid black;
`;

const DivNavbar = styled.div`
  margin: 0;
  padding: 0;
  position: relative;
  height: 20%;
  width: 100%;
`;

const DivAppRow = styled.div`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  height: 80%;
`;

//prettier-ignore
export const blogRoutes = new RegExp('^\/blog\/*.*$');
export const chuckRoutes = new RegExp("^/chucknorris/*.*$");

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
    <DivContainer>
      <DivNavbar>
        <NavbarMenu></NavbarMenu>
        <TabScrollerMenu></TabScrollerMenu>
      </DivNavbar>

      <DivAppRow>
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
          {/* <Route path="/memoryGame">
            <MemoryGame></MemoryGame>
          </Route> */}
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
          <Route exact path="/">
            Home component
          </Route>
          <Route path="*">404 Component</Route>
        </Switch>
      </DivAppRow>
    </DivContainer>
  );
}
export default withRouter(App);
