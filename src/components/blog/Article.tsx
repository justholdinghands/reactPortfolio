import { BASE_URL } from "./Blog";
import { Component, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { theme } from "../../theme";
import marked from "marked";

type Props = {
  blog: {
    author: string;
    title: string;
    text: string;
    date: string;
    articleURL: string;
  };
  fulltext: boolean;
};

export const Article = (props: Props) => {
  function createMarkup() {
    const articleBody = marked(
      props.fulltext ? props.blog.text : props.blog.text.slice(0, 200)
    );
    return {
      __html: articleBody,
    };
  }
  return (
    <div>
      <div>
        <div>
          {props.fulltext === false ? (
            <Link to={`${BASE_URL}${props.blog.articleURL}`}>
              <div>{props.blog.title}</div>
            </Link>
          ) : (
            <div>{props.blog.title}</div>
          )}
          <div>{props.blog.date}</div>
          <div dangerouslySetInnerHTML={createMarkup()}></div>
        </div>
      </div>
    </div>
  );
};
