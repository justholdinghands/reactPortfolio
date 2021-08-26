import { ArticleRouter } from "./articleRouter";
import { theme } from "../../theme";
import { useState } from "react";
import styled from "styled-components";

const DivWrapper = styled.div`
  background: teal;
  height: 50vh;
`;

type Blog = {
  blog: {
    author: string;
    title: string;
    text: string;
    date: string;
    articleURL: string;
  };
};

type Props = {};

type articleState = {
  author: string;
  title: string;
  body: string;
};

export const CreateArticle = (_props: Props) => {
  const [articleState, setArticleState] = useState({
    author: "",
    title: "",
    body: "",
  } as articleState);
  const changeAttr = (e, attrToChange) =>
    setArticleState((p) => ({ ...p, [attrToChange]: e.target.value }));
  return (
    <DivWrapper>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label id="Author">
          Author
          <input
            type="text"
            value={articleState.author}
            onChange={(e) => changeAttr(e, "author")}
          />
        </label>
        <label id="Title">
          Title
          <input
            type="text"
            value={articleState.title}
            onChange={(e) => changeAttr(e, "title")}
          />
        </label>
        <label id="Body">
          Body
          <input
            type="text"
            value={articleState.body}
            onChange={(e) => changeAttr(e, "body")}
          />
        </label>
        <button>Submit Article</button>
      </form>
    </DivWrapper>
  );
};
