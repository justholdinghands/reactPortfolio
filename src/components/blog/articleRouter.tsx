import { Article } from "./Article";
import { Blog, BlogContext } from "./Blog";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { useContext } from "react";

const URL_BASE = "";

export function ArticleRouter() {
  const { blogs } = useContext(BlogContext);
  return (
    <Router>
      <div>
        <nav>
          <link>
            <div>
              <Link to={URL_BASE}>All Posts</Link>
            </div>
            <div>
              <Link to={URL_BASE + "NewPost"}>New Post</Link>
            </div>
          </link>
        </nav>

        <Switch>
          <Route path={URL_BASE + "NewPost"}>{/* <NewPost /> */}</Route>
          {blogs.map((blog, index) => (
            <Route
              key={index}
              path={URL_BASE + "Article/" + blog.blog.articleURL + "-"}
            >
              <Article blog={blog.blog} />
            </Route>
          ))}
          <Route path={URL_BASE}>
            <Blog />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
