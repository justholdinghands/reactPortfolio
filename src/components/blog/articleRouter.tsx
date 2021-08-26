import { Article } from "./Article";
import { Blog, BlogContext } from "./Blog";
import { CreateArticle } from "./CreateArticle";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { useContext } from "react";
import styled from "styled-components";

const URL_BASE = "/";

const NavWrapper = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export function ArticleRouter() {}
