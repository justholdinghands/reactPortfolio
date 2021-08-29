import { ArticleRouter } from "./articleRouter";
import { Blog } from "./Blog";
import { BlogContext } from "./Blog";
import { theme } from "../../theme";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";

const DivWrapper = styled.div`
  background: teal;
  height: 50vh;
`;

type Props = {};

export const CreateArticle = (_props: Props) => {
  const [articleState, setArticleState] = useState({
    blog: { author: "", title: "", text: "", date: "", articleURL: "" },
  } as Blog);
  const blogContext = useContext(BlogContext);
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    blogContext.addBlog((p) => [
      ...p,
      {
        blog: {
          ...articleState.blog,
          date: moment().format("DD. MM. YYYY"),
        },
      },
    ]);
    history.push("/blog/AllPosts");
  };
  const changeAttr = (e, attrToChange) =>
    setArticleState((p) => {
      return {
        blog: {
          ...p.blog,
          [attrToChange]: e.target.value,
          articleURL:
            p.blog.title.replace(" ", "-") + Math.floor(Math.random() * 1000),
        },
      };
    });
  return (
    <DivWrapper>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label id="Author">
          <input
            type="text"
            required
            value={articleState.blog.author}
            onChange={(e) => changeAttr(e, "author")}
          />
        </label>
        <label id="Title">
          Title
          <input
            type="text"
            required
            value={articleState.blog.title}
            onChange={(e) => changeAttr(e, "title")}
          />
        </label>
        <label id="Body">
          Body
          <textarea
            required
            value={articleState.blog.text}
            onChange={(e) => changeAttr(e, "text")}
          />
        </label>
        <button>Submit Article</button>
      </form>
    </DivWrapper>
  );
};
