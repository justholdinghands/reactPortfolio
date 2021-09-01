import { Blog } from "./Blog";
import { BlogContext } from "./Blog";
import { errorMessages } from "./errorMessages";
import { theme } from "../../theme";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
  button {
    margin-top: 1em;
  }
  padding: 3em;
  overflow: hidden;
  width: 80vw;
  height: 100%;
`;

const Input = styled.input<{
  valid: boolean;
}>`
  border: ${(props) =>
    props.valid ? "0" : theme.blog.errorColor + " 2px solid"};
  :focus {
    outline: ${(props) =>
      props.valid ? theme.blog.secondaryTextColor + " 2px solid" : "none"};
  }
`;

const Textarea = styled.textarea<{
  valid: boolean;
}>`
  height: 50vh;
  border: ${(props) =>
    props.valid ? "0" : theme.blog.errorColor + " 2px solid"};
  :focus {
    outline: ${(props) =>
      props.valid ? theme.blog.secondaryTextColor + " 2px solid" : "none"};
  }
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

const PError = styled.p`
  color: ${theme.blog.errorColor};
`;

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

  useEffect(() => {
    if (isUniqueUrl()) {
      setUniqueErr("");
    } else {
      setUniqueErr(errorMessages.uniqueError);
    }
  }, [articleState.title, articleState.articleURL, articleState.author]);

  const validateForm = () => {
    let validated = true;
    if (articleState.author) {
      setAuthorErr("");
    } else {
      validated = false;
      setAuthorErr(errorMessages.authorError);
    }
    if (articleState.title) {
      setTitleErr("");
    } else {
      validated = false;
      setTitleErr(errorMessages.titleError);
    }
    if (articleState.text) {
      setTextErr("");
    } else {
      validated = false;
      setTextErr(errorMessages.bodyError);
    }
    if (!isUniqueUrl()) {
      validated = false;
      setUniqueErr(errorMessages.uniqueError);
    }
    return validated;
  };

  const isUniqueUrl = () => {
    let url = articleState.articleURL
      ? slugify(articleState.articleURL)
      : slugify(articleState.title);
    return !blogContext.blogs
      .filter((blog) => blog.author === articleState.author)
      .some((blog) => url === blog.articleURL);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
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

  const changeAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setAuthorErr("");
    } else {
      setAuthorErr(errorMessages.authorError);
    }
    setArticleState((p) => {
      return {
        ...p,
        author: e.target.value,
      };
    });
  };

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setTitleErr("");
    } else {
      setTitleErr(errorMessages.titleError);
    }
    setArticleState((p) => {
      return {
        ...p,
        title: e.target.value,
      };
    });
  };

  const changeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticleState((p) => {
      return {
        ...p,
        articleURL: e.target.value,
      };
    });
  };

  const changeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value) {
      setTextErr("");
    } else {
      setTextErr(errorMessages.bodyError);
    }
    setArticleState((p) => {
      return {
        ...p,
        text: e.target.value,
      };
    });
  };
  return (
    <DivWrapper>
      <P>Create a new article</P>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label id="Author">
          Author
          <Input
            valid={!authorErr ? true : false}
            type="text"
            value={articleState.author}
            onChange={(e) => changeAuthor(e)}
          />
          <PError>{authorErr}</PError>
        </label>
        <label id="Title">
          Title
          <Input
            valid={!titleErr ? true : false}
            type="text"
            value={articleState.title}
            onChange={(e) => changeTitle(e)}
          />
          <PError>{titleErr}</PError>
        </label>
        <label id="Slug">
          Can I interest you in a custom URL?
          <Input
            valid={!uniqueErr ? true : false}
            type="text"
            placeholder={slugify(articleState.title)}
            value={slugify(articleState.articleURL)}
            onChange={(e) => changeUrl(e)}
          />
          <PError>{uniqueErr}</PError>
        </label>
        <label id="Body">
          Body
          <Textarea
            valid={!textErr ? true : false}
            value={articleState.text}
            onChange={(e) => changeText(e)}
          />
          <PError>{textErr}</PError>
        </label>
        <Button type="submit">Submit</Button>
      </form>
    </DivWrapper>
  );
};
