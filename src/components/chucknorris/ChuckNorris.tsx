import { JokesInCategory } from "./JokesInCategory";
import { Link, Route } from "react-router-dom";
import { theme } from "../../theme";
import { useEffect, useState } from "react";
import styled from "styled-components";

const DivWrapper = styled.div`
  color: ${theme.chuck.primaryColor};
  background: ${theme.chuck.background};
  align-items: center;
  :nth-child(1n) {
    border: 2px pink groove;
  }
`;

export const DivJoke = styled.div`
  font: 1em/3em ${theme.chuck.primaryFont};
`;

const Navbar = styled.nav`
  UlCategories {
    display: flex;
    flex-direction: row;
    font: 2em ${theme.chuck.secondaryFont};
  }
`;

const UlCategories = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  font: 1.5em ${theme.chuck.primaryFont};
  text-decoration: none;
  width: 50%;
  overflow-x: scroll;
  li {
    margin-left: 1em;
    margin-right: 1em;
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
              <Link to={`${baseURL}`}>All</Link>
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
          jokeArr.map((joke, index) => (
            <div key={index}>
              <DivJoke>{joke.value}</DivJoke>
              <br />
            </div>
          ))
        )}
      </Route>
    </DivWrapper>
  );
};
