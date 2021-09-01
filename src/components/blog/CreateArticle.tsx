import { Blog } from "./Blog";
import { BlogContext } from "./Blog";
import { theme } from "../../theme";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import slugify from "react-slugify";
import styled from "styled-components";

const DivWrapper = styled.div`
  background: ${theme.blog.secondary};
  border-radius: 1em;
  margin-top: 2em;
  label {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  textarea {
    height: 50vh;
  }

  button {
    margin-top: 1em;
  }
  padding: 3em;
  overflow: hidden;
  width: 80vw;
  height: 100%;
`;

const Button = styled.button`
  background: ${theme.blog.primary};
  padding: 0.5em;
  border-radius: 0.5em;
  box-shadow: 2px 2px 1px 1px ${theme.blog.secondary};
  :hover {
    color: ${theme.blog.hoverTextColor};
    background: ${theme.blog.background};
  }
`;

const P = styled.p`
  font: 2em ${theme.blog.fontSecondary};
`;

const Form = styled.form``;

type articleAttributes = "author" | "title" | "text";

export const CreateArticle = () => {
  const [articleState, setArticleState] = useState({
    author: "",
    title: "",
    text: "",
    date: "",
    articleURL: "",
  } as Blog);
  const blogContext = useContext(BlogContext);
  const history = useHistory();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    blogContext.addBlog((p) => [
      ...p,
      {
        ...articleState,
        date: moment().format("DD. MM. YYYY"),
      },
    ]);
    history.push("/blog/AllPosts");
  };

  const changeAttr = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    attrToChange: articleAttributes
  ) =>
    setArticleState((p) => {
      return {
        ...p,
        [attrToChange]: e.target.value,
        articleURL: slugify(p.title) + Math.floor(Math.random() * 1000),
      };
    });
  return (
    <DivWrapper>
      <P>Create a new article</P>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <label id="Author">
          Author
          <input
            type="text"
            required
            value={articleState.author}
            onChange={(e) => changeAttr(e, "author")}
          />
        </label>
        <label id="Title">
          Title
          <input
            type="text"
            required
            value={articleState.title}
            onChange={(e) => changeAttr(e, "title")}
          />
        </label>
        <label id="Body">
          Body
          <textarea
            required
            value={articleState.text}
            onChange={(e) => changeAttr(e, "text")}
          />
        </label>
        <Button type="submit">Submit</Button>
      </Form>
    </DivWrapper>
  );
};
