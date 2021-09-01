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

type articleAttributes = "author" | "title" | "text" | "articleURL";

export const CreateArticle = () => {
  const [articleState, setArticleState] = useState({
    author: "",
    title: "",
    text: "",
    date: "",
    articleURL: "",
  } as Blog);
  const blogContext = useContext(BlogContext);
  const [authorErr, setAuthorErr] = useState("");
  const [titleErr, setTitleErr] = useState("");
  const [textErr, setTextErr] = useState("");
  const [uniqueErr, setUniqueErr] = useState("");

  const history = useHistory();

  const validate = () => {
    let validated = true;
    if (articleState.author) {
      setAuthorErr("");
    } else {
      setAuthorErr("author cannot be empty");
      validated = false;
    }
    if (articleState.title) {
      setTitleErr("");
    } else {
      setTitleErr("title cannot be empty");
      validated = false;
    }
    if (articleState.text) {
      setTextErr("");
    } else {
      setTextErr("text cannot be empty");
      validated = false;
    }
    if (!isUniqueUrl(articleState.articleURL)) {
      setUniqueErr("url is not unique");
      validated = false;
    }
    return validated;
  };

  const isUniqueUrl = (url: string) => {
    console.log(
      !blogContext.blogs
        .filter((blog) => blog.author === articleState.author)
        .some((blog) => url === blog.articleURL)
    );
    return !blogContext.blogs
      .filter((blog) => blog.author === articleState.author)
      .some((blog) => url === blog.articleURL);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    blogContext.addBlog((p) => [
      ...p,
      {
        ...articleState,
        articleURL: articleState.articleURL
          ? slugify(articleState.articleURL)
          : slugify(articleState.title),
        date: Date(),
      },
    ]);
    history.push("/blog/AllPosts");
  };

  const changeAttr = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    attrToChange: articleAttributes
  ) => {
    setArticleState((p) => {
      if (attrToChange === "articleURL" || attrToChange === "title") {
        let url = articleState.articleURL
          ? slugify(e.target.value)
          : slugify(e.target.value);
        console.log(url);
        if (isUniqueUrl(url)) {
          setUniqueErr("");
        } else {
          setUniqueErr("Url is not unique");
        }
      }

      return {
        ...p,
        [attrToChange]: e.target.value,
      };
    });
    if (e.target.value) {
      if (attrToChange === "author") {
        setAuthorErr("");
      }
      if (attrToChange === "title") {
        setTitleErr("");
      }
      if (attrToChange === "text") {
        setTextErr("");
      }
    } else {
      if (attrToChange === "author") {
        setAuthorErr(attrToChange + " cannot be empty");
      }
      if (attrToChange === "title") {
        setTitleErr(attrToChange + " cannot be empty");
      }
      if (attrToChange === "text") {
        setTextErr(attrToChange + " cannot be empty");
      }
    }
  };
  return (
    <DivWrapper>
      <P>Create a new article</P>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <label id="Author">
          Author
          <input
            type="text"
            value={articleState.author}
            onChange={(e) => changeAttr(e, "author")}
          />
          {authorErr}
        </label>
        <label id="Title">
          Title
          <input
            type="text"
            value={articleState.title}
            onChange={(e) => changeAttr(e, "title")}
          />
          {titleErr}
        </label>
        <label id="Slug">
          Can I interest you in a custom URL?
          <input
            type="text"
            placeholder={slugify(articleState.title)}
            value={slugify(articleState.articleURL)}
            onChange={(e) => changeAttr(e, "articleURL")}
          />
          {uniqueErr}
        </label>
        <label id="Body">
          Body
          <textarea
            value={articleState.text}
            onChange={(e) => changeAttr(e, "text")}
          />
          {textErr}
        </label>
        <Button type="submit">Submit</Button>
      </Form>
    </DivWrapper>
  );
};
