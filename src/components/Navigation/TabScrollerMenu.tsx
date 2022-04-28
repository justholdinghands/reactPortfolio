import { Link, matchPath, useLocation } from "react-router-dom";
import { Row } from "react-bootstrap";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

function TabScrollerMenu() {
  // You need to provide the routes in descendant order.
  // This means that if you have nested routes like:
  // users, users/new, users/edit.
  // Then the order should be ['users/add', 'users/edit', 'users'].
  const routeMatch = useRouteMatch([
    "/counter",
    "/hackertyper",
    "/todo",
    "/tictactoe",
    // "/memoryGame",
    "/blog",
    "/redux",
    "/chucknorris",
  ]);
  const currentTab = routeMatch?.path;

  return (
    <div className="d-flex align-items-start justify-content-center">
      <Tabs value={currentTab} variant={"scrollable"} scrollButtons={"auto"}>
        <Tab label="Counter" value="/counter" to="/counter" component={Link} />
        <Tab
          label="HackerTyper"
          value="/hackertyper"
          to="/hackertyper"
          component={Link}
        />
        <Tab label="TO-DO List" value="/todo" to="/todo" component={Link} />
        <Tab
          label="Tic-tac-toe"
          value="/tictactoe"
          to="/tictactoe"
          component={Link}
        />
        {/* <Tab
          label="Memory Game"
          value="/memoryGame"
          to="/memoryGame"
          component={Link}
        /> */}
        <Tab label="Blog App" value="/blog" to="/blog" component={Link} />
        <Tab
          label="Redux Counter"
          value="/redux"
          to="/redux"
          component={Link}
        />
        <Tab
          label="Joke Generator"
          value="/chucknorris"
          to="/chucknorris"
          component={Link}
        />
      </Tabs>
      <Row className="h-75"></Row>
    </div>
  );
}

export default TabScrollerMenu;
