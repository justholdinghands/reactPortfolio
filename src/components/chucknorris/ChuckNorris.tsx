import { JokesInCategory } from "./JokesInCategory";
import { Link, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

const UlCategories = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
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

const numberOfJokes = 20;

export const ChuckNorris = (props: Props) => {
  const [jokeArr, setJokeArr] = useState([] as Joke[]);
  const [categories, setCategories] = useState([] as Category[]);
  const [loadingJokes, setLoadingJokes] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const load = async () => {
      const loadJokeArr = [] as Joke[];
      while (loadJokeArr.length !== numberOfJokes) {
        let loadData = await fetch("https://api.chucknorris.io/jokes/random");
        let data: Joke = await loadData.json();
        if (!loadJokeArr.some((element) => element.value === data.value)) {
          loadJokeArr.push(data);
        }
      }
      setJokeArr([...loadJokeArr]);
      setLoadingJokes(false);
      const loadCategories = await fetch(
        "https://api.chucknorris.io/jokes/categories"
      );
      const listCategories = await loadCategories.json();
      setCategories([...listCategories]);
      setLoadingCategories(false);
    };
    load();
  }, []);
  return (
    <div>
      {loadingCategories ? (
        <div>Loading Categories ...</div>
      ) : (
        <div>
          <button>All</button>
          <UlCategories>
            {categories.map((category, index) => (
              <li key="index">
                <Link to={`/chucknorris/${category}`}> #{category} </Link>
              </li>
            ))}
          </UlCategories>
        </div>
      )}
      {categories.map((category) => (
        <Route key={`${category}`} path={`/chucknorris/${category}`}>
          <JokesInCategory category={category}></JokesInCategory>
        </Route>
      ))}
      <Route exact path={`/chucknorris`}>
        {loadingJokes && <div>Loading Jokes ...</div>}
        {!loadingJokes &&
          jokeArr.map((joke, index) => (
            <div key={index}>
              <div>{joke.value}</div>
              <br />
            </div>
          ))}
      </Route>
    </div>
  );
};
