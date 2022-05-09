import { Link, matchPath, useLocation } from "react-router-dom";
import { Row } from "react-bootstrap";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { theme } from "../../theme";
import Tab from "@mui/material/Tab";
import Tabs, { TabsProps } from "@mui/material/Tabs";

const customTheme = createTheme({
  palette: {
    primary: {
      light: `${theme.colors.primaryFaded}`,
      main: `${theme.colors.secondary}`,
      dark: `${theme.colors.primary}`,
      contrastText: `${theme.colors.white}`,
    },
  },
});

const StyledTabs = styled(Tabs)<TabsProps>(({ theme }) => ({
  paddingInline: 20,
  color: theme.palette.primary.light,

  "& .MuiTab-textColorPrimary": {
    color: theme.palette.primary.dark,
    "&:hover, &.Mui-selected": {
      color: `${theme.palette.primary.contrastText}`,
    },
  },
  "& .MuiTabs-indicator": {
    background: theme.palette.primary.contrastText,
  },
}));

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
  const routeMatch = useRouteMatch([
    "/counter",
    "/hackertyper",
    "/todo",
    "/tictactoe",
    "/blog",
    "/redux",
    "/chucknorris",
    "/",
  ]);
  const currentTab = routeMatch?.path;

  return (
    <ThemeProvider theme={customTheme}>
      <div className="d-flex align-items-start justify-content-center">
        <StyledTabs
          value={currentTab}
          variant={"scrollable"}
          scrollButtons={"auto"}
        >
          <Tab
            label="Counter"
            value={"/counter" || "/"}
            to="/counter"
            component={Link}
          />
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
          <Tab
            label="Blog App"
            value="/blog/all-posts"
            to="/blog/all-posts"
            component={Link}
          />
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
        </StyledTabs>
        <Row className="h-75"></Row>
      </div>
    </ThemeProvider>
  );
}

export default TabScrollerMenu;
