import { Joke } from "./ChuckNorris";
import { useEffect, useState } from "react";

type Props = {
  category: string;
};

const jokesPool = 20;
const numberOfJokes = 5;

export const JokesInCategory = (props: Props) => {
  const [jokeArr, setJokeArr] = useState([] as Joke[]);
  const [loadingJokes, setLoadingJokes] = useState(true);

  useEffect(() => {
    const load = async () => {
      let loadJokeArr = [] as Joke[];
      for (let i = 0; loadJokeArr.length < jokesPool; i++) {
        let loadData = await fetch(
          `https://api.chucknorris.io/jokes/random?category=${props.category}`
        );
        let data: Joke = await loadData.json();

        loadJokeArr.push(data);
      }
      loadJokeArr = loadJokeArr.filter(
        (joke, index, arr) => arr.findIndex((t) => t.id === joke.id) === index
      );
      setJokeArr([...loadJokeArr]);
      setLoadingJokes(false);
    };
    load();
  }, []);
  return (
    <div>
      {loadingJokes ? (
        <div>Loading jokes ...</div>
      ) : (
        // https://stackoverflow.com/a/56757215/14539184
        jokeArr.map((joke, index) => <div key={index}>{joke.value}</div>)
      )}
    </div>
  );
};
