import { Link } from "react-router-dom";
import marked from "react-marked";

type Props = {
  blog: {
    author: string;
    title: string;
    text: string;
    date: string;
    articleURL: string;
  };
};

function ArticleCard(props: Props) {
  const articleBody = marked(props.blog.text);
  return (
    <div>
      <div>
        <div>
          <div>{props.blog.articleURL}</div>
          <div>{props.blog.date}</div>
          <div>{articleBody}</div>
          <Link to={`/article/${props.blog.articleURL}`}>
            <button>See more</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
