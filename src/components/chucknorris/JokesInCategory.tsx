import { DivJoke, Joke, numberOfJokes } from "./ChuckNorris";
import { theme } from "../../theme";
import { useEffect, useState } from "react";
import styled from "styled-components";

type Props = {
  category: string;
};

const topFive = 5;

const H2 = styled.h2`
  text-align: center;
  font: 3em ${theme.chuck.secondaryFont};
  color: ${theme.chuck.secondaryColor};
`;

export const JokesInCategory = (props: Props) => {
  const [jokeArr, setJokeArr] = useState([] as Joke[]);
  const [loadingJokes, setLoadingJokes] = useState(true);

  useEffect(() => {
    const load = async () => {
      let loadJokeArr = [] as Joke[];
      for (let i = 0; loadJokeArr.length < numberOfJokes; i++) {
        let loadData = await fetch(
          `https://api.chucknorris.io/jokes/random?category=${props.category}`
        );
        let data: Joke = await loadData.json();

        loadJokeArr.push(data);
      }
      // https://stackoverflow.com/a/56757215/14539184
      loadJokeArr = loadJokeArr.filter(
        (joke, index, arr) => arr.findIndex((t) => t.id === joke.id) === index
      );
      loadJokeArr = loadJokeArr.slice(0, topFive);
      setJokeArr([...loadJokeArr]);
      setLoadingJokes(false);
    };
    load();
  }, []);
  return (
    <div>
      <H2>Top 5: </H2>
      {loadingJokes ? (
        <div>Loading jokes ...</div>
      ) : (
        jokeArr.map((joke, index) => (
          <DivJoke key={index}>{joke.value}</DivJoke>
        ))
      )}
    </div>
  );
};
