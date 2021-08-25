import { Component, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { theme } from "../../theme";
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

export const Article = (props: Props) => {
  const articleBody = marked(props.blog.text);
  return (
    <div>
      <div>
        <div>
          <div>{props.blog.articleURL}</div>
          <div>{props.blog.date}</div>
          <div>{articleBody}</div>
        </div>
      </div>
    </div>
  );
};
