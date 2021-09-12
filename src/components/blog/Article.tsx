import { BASE_URL, Blog } from "./Blog";
import { DivIcon } from "../../App";
import { Link } from "react-router-dom";
import { theme } from "../../theme";
import marked from "marked";
import moment from "moment";
import programmer from "../../icons/programmer.png";
import styled from "styled-components";

const DivArticle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: safe;
  background: ${theme.blog.primary};
  border-radius: 0.5em;
  padding-bottom: 3em;
  word-wrap: break-word;
  overflow: hidden;
  border-radius: 10px;
  height: 500px;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
  border: solid 2px ${theme.blog.primary};
  margin: 2em;
  width: 70vw;
`;
const DivTitle = styled.div`
  font-size: 3em;
  padding: 15px;
  font-weight: 800;
  width: 100%;
`;

const DivDate = styled.div`
  margin-top: -2em;
  margin-left: 4.5em;
  color: ${theme.blog.secondaryTextColor};
  font-size: 1em;
`;

const DivWrapAuthor = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 2em;
  padding: 0.5em;
  img {
    font-size: ${theme.blog.iconSize};
    margin: 0.1em;
  }
`;

const DivAuthor = styled.div`
  padding: 0.5em;
  color: ${theme.blog.secondaryTextColor};
  font-size: 1em;
`;

const DivBody = styled.div`
  padding: 0.5em;
  font-size: 2em;
`;

type Props = {
  blog: Blog;
  fulltext: boolean;
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

  const oneDay = 1000 * 60 * 60 * 24;

  return (
    <div>
      <div>
        <DivArticle>
          <DivWrapAuthor>
            <DivIcon>
              <img src={programmer} alt="programmer" />
            </DivIcon>
            <Link to={`${BASE_URL}${props.blog.author}`}>
              <DivAuthor>{props.blog.author}</DivAuthor>
            </Link>
          </DivWrapAuthor>
          <DivDate>
            {moment(props.blog.date).format("DD. MM. YYYY") +
              " (" +
              (
                (Number(moment(new Date())) - Number(moment(props.blog.date))) /
                oneDay
              ).toFixed(0) +
              " days ago)"}
          </DivDate>
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
