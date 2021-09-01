import { Article } from "./Article";
import { Component, useEffect, useRef, useState } from "react";
import { CreateArticle } from "./CreateArticle";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { theme } from "../../theme";
import React from "react";
import styled from "styled-components";

const DivCreate = styled.div`
  height: 100%;
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
  background: ${theme.blog.primary};
`;

const DivFullWrapper = styled.div`
  height: 100vh;
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
  height: 100%;
  a {
    color: ${theme.blog.primaryTextColor};
    text-decoration: none;
  }
`;

const DivArticles = styled.div`
  display: grid;
  grid-gap: 1%;
  grid-template-columns: repeat(auto-fit, minmax(50%, 2fr));
  grid-auto-rows: 50%;
  grid-auto-flow: dense;
  padding-top: 5em;
`;

export type Blog = {
  blog: {
    author: string;
    title: string;
    text: string;
    date: string;
    articleURL: string;
  };
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
            <div>
              <Link to={`${BASE_URL}AllPosts`}>All posts</Link>
            </div>
            <div>
              <Link to={`${BASE_URL}NewPost`}>New Post</Link>
            </div>
          </NavWrapper>
          <Route path={`${BASE_URL}NewPost`}>
            <DivCreate>
              <CreateArticle></CreateArticle>
            </DivCreate>
          </Route>
          <Route path={`${BASE_URL}AllPosts`}>
            <DivArticles>
              {blogs.map((blog, index) => (
                <Article key={index} blog={blog.blog} fulltext={false} />
              ))}
            </DivArticles>

            {blogs.map((blog, index) => (
              <Route key={index} path={`${BASE_URL}${blog.blog.articleURL}`}>
                <Article blog={blog.blog} fulltext={true} />
              </Route>
            ))}
          </Route>
        </DivWrapper>
      </BlogContext.Provider>
    </DivFullWrapper>
  );
};
