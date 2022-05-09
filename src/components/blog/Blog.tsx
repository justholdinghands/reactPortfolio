import { Article } from "./Article";
import { CreateArticle } from "./CreateArticle";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { genericContextBuilder } from "../../utils";
import { theme } from "../../theme";
import styled from "styled-components";
import useLocalStorage from "use-local-storage";

const DivContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const NavWrapper = styled.nav`
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10%;
  font-family: ${theme.fonts.fontFamily2};

  a {
    font-family: ${theme.fonts.fontFamily2};
    font-size: 3vh;
    color: ${theme.colors.white};
    text-decoration: none;
  }
`;

const H1NavLink = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  font-size: 3vh;

  a {
    color: ${theme.colors.primary};
  }

  a:hover {
    color: ${theme.colors.white};
  }
`;

const UlArticles = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  padding: 0;
  height: 80%;
  width: 100%;
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
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
          <H1NavLink>
            <Link to={`${BASE_URL}all-posts`}>All Posts</Link>
          </H1NavLink>
          <H1NavLink>
            <Link to={`${BASE_URL}new-post`}>New Post</Link>
          </H1NavLink>
        </NavWrapper>
        {context.blogs.map((blog) => (
          <Route
            key={`${blog.author}/${blog.articleURL}`}
            path={`${BASE_URL}${blog.author}/${blog.articleURL}`}
          >
            <Article blog={blog} fulltext={true} />
          </Route>
        ))}
        <Route path={`${BASE_URL}new-post`}>
          <CreateArticle></CreateArticle>
        </Route>
        <Route path={`${BASE_URL}all-posts`}>
          <UlArticles>
            {context.blogs
              .slice(0)
              .reverse()
              .map((blog) => (
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
