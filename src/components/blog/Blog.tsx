import { Article } from "./Article";
import { CreateArticle } from "./CreateArticle";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { theme } from "../../theme";
import { useEffect, useState } from "react";
import React from "react";
import styled from "styled-components";

const DivCreate = styled.div`
  height: 100vh;
  background: ${theme.blog.background};
`;

const NavWrapper = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  font: 2em ${theme.blog.fontPrimary};
  color: ${theme.blog.primaryTextColor};
  padding: 0.5em;
  background: ${theme.blog.background};
`;

const NavDiv = styled.div`
  background: ${theme.blog.primary};
  padding: 0.5em;
  border-radius: 0.5em;
  box-shadow: 12px 12px 2px 1px ${theme.blog.secondary};
`;

const DivFullWrapper = styled.div`
  width: 100vw;
  background: ${theme.blog.background};
`;

const DivWrapper = styled.div`
  font: 100% ${theme.blog.fontSecondary};
  color: ${theme.blog.primaryTextColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: ${theme.blog.background};

  width: 100vw;
  a {
    color: ${theme.blog.primaryTextColor};
    text-decoration: none;
  }
`;

const DivArticles = styled.div``;

export type Blog = {
  author: string;
  title: string;
  text: string;
  date: string;
  articleURL: string;
};

type BlogContextValue = {
  blogs: Blog[];
  addBlog: React.Dispatch<React.SetStateAction<Blog[]>>;
};

export const BlogContext = React.createContext<BlogContextValue>(null as any);

export const BASE_URL = "/blog/";

export const BlogComponent = () => {
  const [blogs, addBlog] = useState([] as Blog[]);

  useEffect(() => {
    addBlog(JSON.parse(localStorage.getItem("blogs") as string));
  }, []);
  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

  return (
    <DivFullWrapper>
      <BlogContext.Provider value={{ blogs, addBlog }}>
        <DivWrapper>
          <NavWrapper>
            <NavDiv>
              <Link to={`${BASE_URL}AllPosts`}>All posts</Link>
            </NavDiv>
            <NavDiv>
              <Link to={`${BASE_URL}NewPost`}>New Post</Link>
            </NavDiv>
          </NavWrapper>
          {blogs.map((blog, index) => (
            <Route key={index} path={`${BASE_URL}${blog.articleURL}`}>
              <Article blog={blog} fulltext={true} />
            </Route>
          ))}
          <Route path={`${BASE_URL}NewPost`}>
            <DivCreate>
              <CreateArticle></CreateArticle>
            </DivCreate>
          </Route>
          <Route path={`${BASE_URL}AllPosts`}>
            <DivArticles>
              {blogs.map((blog, index) => (
                <Article key={index} blog={blog} fulltext={false} />
              ))}
            </DivArticles>
          </Route>
        </DivWrapper>
      </BlogContext.Provider>
    </DivFullWrapper>
  );
};
