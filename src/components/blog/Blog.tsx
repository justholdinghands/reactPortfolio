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
  justify-content: space-between;
  align-items: center;
  width: 70vw;
  height: 3em;
  font: 2em ${theme.blog.fontPrimary};
  color: ${theme.blog.primaryTextColor};
  padding: 0.5em;
  background: ${theme.blog.background};
`;

const NavDiv = styled.div`
  background: ${theme.blog.primary};
  padding: 0.5em;
  border-radius: 0.5em;
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

const DivArticles = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

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
          {context.blogs
            .filter(
              (blog, index, arr) =>
                arr.findIndex((t) => t.author === blog.author) === index
            )
            .map((uniqueAuthor) => (
              <Route
                key={uniqueAuthor.author}
                exact
                path={`${BASE_URL}${uniqueAuthor.author}`}
              >
                <DivArticles>
                  {context.blogs.map((blog) =>
                    blog.author === uniqueAuthor.author ? (
                      <Article
                        key={`${blog.author}/${blog.articleURL}`}
                        blog={blog}
                        fulltext={false}
                      />
                    ) : null
                  )}
                </DivArticles>
              </Route>
            ))}
        </DivWrapper>
      </BlogContext.Provider>
    </DivFullWrapper>
  );
};
