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
  width: 100%;
  height: 3em;
  font: 2em ${theme.blog.fontPrimary};
  color: ${theme.blog.primaryTextColor};

  background: ${theme.blog.primary};
`;

const DivFullWrapper = styled.div`
  width: 100%;
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
  width: 100%;
  a {
    color: ${theme.blog.primaryTextColor};
    text-decoration: none;
  }
`;

const DivAll = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 2%;
  padding-right: 2%;
  width: 300px;
  height: 100%;
`;

const DivNew = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 50%;
  border-radius: 5%;
  font-size: 23px;
  font-weight: 800;
  background: ${theme.blog.secondaryTextColor};
  margin-right: 2em;
  a {
    color: ${theme.blog.primaryTextColor};
    :active {
      color: ${theme.blog.secondaryTextColor};
    }
  }
  :active {
    background: ${theme.blog.primaryTextColor};
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
            <DivAll>
              <Link to={`${BASE_URL}AllPosts`}>React blog site</Link>
            </DivAll>
            <DivNew>
              <Link to={`${BASE_URL}NewPost`}>New Post</Link>
            </DivNew>
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

// searchbar
// todo: pridavanie fotiek
// share on fb, twitter, reddit, linkedinm, copyurl
// hashtag
// like
