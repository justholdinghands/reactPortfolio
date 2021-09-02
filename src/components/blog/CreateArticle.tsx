import { Blog } from "./Blog";
import { BlogContext } from "./Blog";
import { errorMessages } from "./errorMessages";
import { theme } from "../../theme";
import { useContext, useState } from "react";
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

type errorTypes = {
  authorErr: string;
  titleErr: string;
  textErr: string;
  uniqueErr: string;
};

export const CreateArticle = () => {
  const [articleState, setArticleState] = useState({
    author: "",
    title: "",
    text: "",
    date: "",
    articleURL: "",
  } as Blog);
  const blogContext = useContext(BlogContext);
  const [errorMessage, setErrorMessage] = useState({
    authorErr: "",
    titleErr: "",
    textErr: "",
    uniqueErr: "",
  } as errorTypes);

  const history = useHistory();

  const validateForm = () => {
    let validated = true;
    if (articleState.author) {
      setErrorMessage((p) => ({ ...p, authorErr: "" }));
    } else {
      validated = false;
      setErrorMessage((p) => ({
        ...p,
        authorErr: errorMessages.authorError,
      }));
    }
    if (articleState.title) {
      setErrorMessage((p) => ({ ...p, titleErr: "" }));
    } else {
      validated = false;
      setErrorMessage((p) => ({
        ...p,
        titleErr: errorMessages.titleError,
      }));
    }
    if (articleState.text) {
      setErrorMessage((p) => ({ ...p, textErr: "" }));
    } else {
      validated = false;
      setErrorMessage((p) => ({
        ...p,
        textErr: errorMessages.textError,
      }));
    }
    let url = articleState.articleURL
      ? slugify(articleState.articleURL)
      : slugify(articleState.title);
    if (!isUniqueUrl(url, articleState.author)) {
      validated = false;
      setErrorMessage((p) => ({
        ...p,
        uniqueErr: errorMessages.uniqueError,
      }));
    }
    return validated;
  };

  const isUniqueUrl = (url: string, author: string) => {
    return !blogContext.blogs
      .filter((blog) => blog.author === author)
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
      setErrorMessage((p) => ({ ...p, authorErr: "" }));
    } else {
      setErrorMessage((p) => ({
        ...p,
        authorErr: errorMessages.authorError,
      }));
    }
    setArticleState((p) => {
      return {
        ...p,
        author: e.target.value,
      };
    });
    let url = articleState.articleURL
      ? slugify(articleState.articleURL)
      : slugify(articleState.title);
    if (isUniqueUrl(url, e.target.value)) {
      setErrorMessage((p) => ({ ...p, uniqueErr: "" }));
    } else {
      setErrorMessage((p) => ({
        ...p,
        uniqueErr: errorMessages.uniqueError,
      }));
    }
  };

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setErrorMessage((p) => ({ ...p, titleErr: "" }));
    } else {
      setErrorMessage((p) => ({
        ...p,
        titleErr: errorMessages.titleError,
      }));
    }
    setArticleState((p) => {
      return {
        ...p,
        title: e.target.value,
      };
    });
    let url = articleState.articleURL
      ? slugify(articleState.articleURL)
      : slugify(e.target.value);
    if (isUniqueUrl(url, articleState.author)) {
      setErrorMessage((p) => ({ ...p, uniqueErr: "" }));
    } else {
      setErrorMessage((p) => ({
        ...p,
        uniqueErr: errorMessages.uniqueError,
      }));
    }
  };

  const changeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticleState((p) => {
      return {
        ...p,
        articleURL: e.target.value,
      };
    });
    let url = e.target.value
      ? slugify(e.target.value)
      : slugify(articleState.title);
    if (isUniqueUrl(url, articleState.author)) {
      setErrorMessage((p) => ({ ...p, uniqueErr: "" }));
    } else {
      setErrorMessage((p) => ({
        ...p,
        uniqueErr: errorMessages.uniqueError,
      }));
    }
  };

  const changeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value) {
      setErrorMessage((p) => ({ ...p, textErr: "" }));
    } else {
      setErrorMessage((p) => ({
        ...p,
        textErr: errorMessages.textError,
      }));
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
      <form onSubmit={handleSubmit}>
        <label id="Author">
          Author
          <Input
            valid={!errorMessage.authorErr}
            type="text"
            value={articleState.author}
            onChange={changeAuthor}
          />
          <PError>{errorMessage.authorErr}</PError>
        </label>
        <label id="Title">
          Title
          <Input
            valid={!errorMessage.titleErr}
            type="text"
            value={articleState.title}
            onChange={changeTitle}
          />
          <PError>{errorMessage.titleErr}</PError>
        </label>
        <label id="Slug">
          Can I interest you in a custom URL?
          <Input
            valid={!errorMessage.uniqueErr}
            type="text"
            placeholder={slugify(articleState.title)}
            value={slugify(articleState.articleURL)}
            onChange={changeUrl}
          />
          <PError>{errorMessage.uniqueErr}</PError>
        </label>
        <label id="Body">
          Body
          <Textarea
            valid={!errorMessage.textErr}
            value={articleState.text}
            onChange={changeText}
          />
          <PError>{errorMessage.textErr}</PError>
        </label>
        <Button type="submit">Submit</Button>
      </form>
    </DivWrapper>
  );
};
