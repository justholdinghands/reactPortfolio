import { BASE_URL, Blog } from "./Blog";
import { Link } from "react-router-dom";
import { theme } from "../../theme";
import marked from "marked";
import programmer from "../../icons/programmer.png";
import styled from "styled-components";

const DivArticle = styled.div`
  display: flex;
  flex-direction: column;
  background: ${theme.blog.white};
  padding-bottom: 3em;
  word-wrap: break-word;
  overflow: hidden;
  border-radius: 10px;
  height: 100%;
  margin: 10px;
  width: 70vw;
  padding: 15px;
  a {
    text-decoration: none;
  }
`;

const DivWrapAuthor = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 50%;

  img {
    width: 50px;
    height: 50px;
  }
`;

const DivAuthorName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 2vh;
`;

const DivAuthor = styled.div`
  color: ${theme.blog.secondaryTextColor};
  font-size: 1.8vh;
  font-style: italic;
`;

const DivDate = styled.div`
  font-size: 1.2vh;
  color: ${theme.blog.secondaryTextColor};
`;

const DivTitle = styled.div`
  font-size: 3vh;
  margin: 2vh 0;
  color: ${theme.blog.primary};
`;

const DivBody = styled.div``;

type Props = {
  blog: Blog;
  fulltext: boolean;
};

const daysAgo = (date: Date) => {
  const oneDay = 1000 * 60 * 60 * 24;
  const today = Number(new Date());
  const publishDate = Number(new Date(date));
  return ((today - publishDate) / oneDay).toFixed(0);
};

export const Article = (props: Props) => {
  const createMarkup = () => {
    const articleBody = marked(
      props.fulltext ? props.blog.text : props.blog.text.slice(0, 200)
    );
    return {
      __html: articleBody,
    };
  };

  return (
    <div>
      <div>
        <DivArticle>
          <DivWrapAuthor>
            <Link to={`${BASE_URL}${props.blog.author}`}>
              <img src={programmer} alt="programmer" />
            </Link>
            <DivAuthorName>
              <Link to={`${BASE_URL}${props.blog.author}`}>
                <DivAuthor>{props.blog.author}</DivAuthor>
              </Link>
              <DivDate>
                {new Date(props.blog.date).toLocaleString("en-US", {
                  timeZone: "UTC",
                  weekday: "long",
                  year: "numeric",
                  month: "numeric",
                  day: "2-digit",
                }) +
                  " (" +
                  daysAgo(props.blog.date) +
                  " days ago)"}
              </DivDate>
            </DivAuthorName>
          </DivWrapAuthor>
          {props.fulltext ? (
            <DivTitle>{props.blog.title}</DivTitle>
          ) : (
            <Link
              to={`${BASE_URL}${props.blog.author}/${props.blog.articleURL}`}
            >
              <DivTitle>{props.blog.title}</DivTitle>
            </Link>
          )}
          <DivBody dangerouslySetInnerHTML={createMarkup()}></DivBody>
        </DivArticle>
      </div>
    </div>
  );
};
