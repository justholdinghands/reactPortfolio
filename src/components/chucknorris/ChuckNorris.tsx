import { JokesInCategory } from "./JokesInCategory";
import { Link, Route } from "react-router-dom";
import { theme } from "../../theme";
import { useEffect, useState } from "react";
import norris from "../../icons/norris.png";
import styled from "styled-components";

export const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${theme.chuck.primaryColor};
  align-items: center;
  min-height: 100%;
  width: 100%;
`;

export const DivAllJokes = styled.div`
  padding-top: 2em;
  width: 60%;
`;

export const DivJokeWrapper = styled.div`
  display: flex;
  flex: row;
  align-items: center;
  padding-bottom: 1em;
  img {
    margin-left: 0.1em;
    margin-right: 0.5em;
    height: 1.5em;
    width: 1.5em;
  }
`;

export const DivJoke = styled.div`
  font: 1.5em ${theme.chuck.primaryFont};
`;

const Navbar = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 25%;
`;

const UlCategories = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font: 1.5em ${theme.chuck.primaryFont};
  text-decoration: none;
  overflow-x: scroll;
  position: relative;
  padding-bottom: 0.5em;

  ::-webkit-scrollbar-track {
    box-shadow: ${theme.chuck.scrollbarShadow};
    border-radius: 10px;
  }

  ::-webkit-scrollbar {
    margin-left: 30px;
    float: left;
    height: 5px;
    background-color: ${theme.chuck.scrollbar};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: ${theme.chuck.scrollbarShadow};
    background-color: ${theme.chuck.scrollbarThumb};
  }
  li {
    margin-right: 2em;
    a {
      color: ${theme.chuck.primaryColor};
    }
  }
`;

const H1 = styled.h1`
  text-align: center;
  font: 5em ${theme.chuck.secondaryFont};
  color: ${theme.chuck.secondaryColor};
`;

type Props = {};

type Category = string;

export type Joke = {
  categories: Category[];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
};

export const numberOfJokes = 20;

const baseURL = "/chucknorris";

export const ChuckNorris = (props: Props) => {
  const [jokeArr, setJokeArr] = useState([] as Joke[]);
  const [categories, setCategories] = useState([] as Category[]);
  const [loadingJokes, setLoadingJokes] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const load = async () => {
      const loadJokeArr = [] as Joke[];
      try {
        while (loadJokeArr.length !== numberOfJokes) {
          let loadData = await fetch("https://api.chucknorris.io/jokes/random");
          if (!loadData.ok) throw new Error(`${loadData.status}`);
          let data = await loadData.json();
          if (!loadJokeArr.some((element) => element.value === data.value)) {
            loadJokeArr.push(data);
          }
        }
      } catch (errJoke) {
        console.error("Error loading jokes: " + errJoke);
      }
      setJokeArr([...loadJokeArr]);
      setLoadingJokes(false);
      try {
        const loadCategories = await fetch(
          "https://api.chucknorris.io/jokes/categories"
        );
        if (!loadCategories.ok) throw new Error(`${loadCategories.status}`);
        const listCategories = await loadCategories.json();
        setCategories([...listCategories]);
        setLoadingCategories(false);
      } catch (errCat) {
        console.error("Error loading categories: " + errCat);
      }
    };
    load();
  }, []);

  return (
    <DivWrapper>
      <H1>Chuck Norris</H1>
      {loadingCategories ? (
        <div>Loading Categories ...</div>
      ) : (
        <Navbar>
          <UlCategories>
            <li>
              <Link to={`${baseURL}`}>#all</Link>
            </li>
            {categories.map((category, index) => (
              <li key={index}>
                <Link to={`${baseURL}/${category}`}> #{category} </Link>
              </li>
            ))}
          </UlCategories>
        </Navbar>
      )}
      {categories.map((category) => (
        <Route key={`${category}`} path={`${baseURL}/${category}`}>
          <JokesInCategory category={category}></JokesInCategory>
        </Route>
      ))}
      <Route exact path={`${baseURL}`}>
        {loadingJokes ? (
          <div>Loading Jokes ...</div>
        ) : (
          <DivAllJokes>
            {jokeArr.map((joke, index) => (
              <DivJokeWrapper key={index}>
                <img src={norris} alt="chuckhead" />
                <DivJoke>{joke.value}</DivJoke>
              </DivJokeWrapper>
            ))}
          </DivAllJokes>
        )}
      </Route>
    </DivWrapper>
  );
};
