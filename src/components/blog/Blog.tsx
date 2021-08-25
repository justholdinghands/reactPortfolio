import { ArticleRouter } from "./articleRouter";
import { Component, useEffect, useRef, useState } from "react";
import { theme } from "../../theme";
import ArticleCard from "./ArticleCard";
import React from "react";

type Blog = {
  blog: {
    author: string;
    title: string;
    text: string;
    date: string;
    articleURL: string;
  };
};

type BlogContextValue = {
  blogs: Blog[];
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
};

export const BlogContext = React.createContext<BlogContextValue>(null as any);

export const Blog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  return (
    <BlogContext.Provider value={{ blogs, setBlogs }}>
      <ArticleRouter></ArticleRouter>
    </BlogContext.Provider>
  );
};
