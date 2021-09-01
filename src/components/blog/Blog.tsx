import { Article } from "./Article";
import { CreateArticle } from "./CreateArticle";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { genericContextBuilder } from "../../utils";
import { theme } from "../../theme";
import styled from "styled-components";
import useLocalStorage from "use-local-storage";

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

export const BASE_URL = "/blog/";

const useValue = () => {
  const [blogs, addBlog] = useLocalStorage("blogs", [] as Blog[]);
  return {
    blogs,
    addBlog,
  };
};

export const BlogContext = genericContextBuilder(useValue);

export const BlogComponent = () => {
  const context = useValue();
  return (
    <DivFullWrapper>
      <BlogContext.Provider value={context}>
        <DivWrapper>
          <NavWrapper>
            <NavDiv>
              <Link to={`${BASE_URL}AllPosts`}>All posts</Link>
            </NavDiv>
            <NavDiv>
              <Link to={`${BASE_URL}NewPost`}>New Post</Link>
            </NavDiv>
          </NavWrapper>
          {context.blogs.map((blog) => (
            <Route
              key={`${blog.author}/${blog.articleURL}`}
              path={`${BASE_URL}${blog.author}/${blog.articleURL}`}
            >
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
              {context.blogs.map((blog) => (
                <Article
                  key={`${blog.author}/${blog.articleURL}`}
                  blog={blog}
                  fulltext={false}
                />
              ))}
            </DivArticles>
          </Route>
        </DivWrapper>
      </BlogContext.Provider>
    </DivFullWrapper>
  );
};
