import { Article } from "./Article";
import { CreateArticle } from "./CreateArticle";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { genericContextBuilder } from "../../utils";
import { theme } from "../../theme";
import styled from "styled-components";
import useLocalStorage from "use-local-storage";

const DivContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`;

const NavWrapper = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10%;
  font: 10px ${theme.blog.fontPrimary};

  a {
    font-size: 3vh;
    color: ${theme.blog.white};
    text-decoration: none;
  }
`;

const H1AllPosts = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  font-size: 3vh;
  color: ${theme.blog.primary};
`;

const H1NewPost = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
`;

const DivCreate = styled.div`
  height: 100vh;
  background: ${theme.blog.secondary};
`;

const UlArticles = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  overflow-y: scroll;
  padding: 0;
`;

export type Blog = {
  author: string;
  title: string;
  text: string;
  date: Date;
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
    <DivContainer>
      <BlogContext.Provider value={context}>
        <NavWrapper>
          <H1AllPosts>
            <Link to={`${BASE_URL}AllPosts`}>All Posts</Link>
          </H1AllPosts>
          <H1NewPost>
            <Link to={`${BASE_URL}NewPost`}>New Post</Link>
          </H1NewPost>
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
          <CreateArticle></CreateArticle>
        </Route>
        <Route path={`${BASE_URL}AllPosts`}>
          <UlArticles>
            {context.blogs.map((blog) => (
              <Article
                key={`${blog.author}/${blog.articleURL}`}
                blog={blog}
                fulltext={false}
              />
            ))}
          </UlArticles>
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
              <UlArticles>
                {context.blogs.map((blog) =>
                  blog.author === uniqueAuthor.author ? (
                    <Article
                      key={`${blog.author}/${blog.articleURL}`}
                      blog={blog}
                      fulltext={false}
                    />
                  ) : null
                )}
              </UlArticles>
            </Route>
          ))}
      </BlogContext.Provider>
    </DivContainer>
  );
};

// searchbar
// todo: pridavanie fotiek
// share on fb, twitter, reddit, linkedinm, copyurl
// hashtag
// like
