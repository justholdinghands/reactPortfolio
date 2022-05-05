import {
  DivAllJokes,
  DivContainer,
  DivJoke,
  DivJokeWrapper,
  Joke,
  numberOfJokes,
} from "./ChuckNorris";
import { DivErrorPopup, DivImg, ImgLeft, ImgRight } from "./ChuckNorris";
import { theme } from "../../theme";
import { useEffect, useState } from "react";
import configURL from "./urlconfig.json";
import norris from "../../icons/norris.png";
import revolver from "./imgs/revolver.png";
import styled from "styled-components";

type Props = {
  category: string;
};

const topFive = 5;

const H2 = styled.h2`
  text-align: center;
  font: 3em ${theme.fonts.fontFamily7};
  color: ${theme.colors.primaryFaded};
`;

export const JokesInCategory = (props: Props) => {
  const [jokeArr, setJokeArr] = useState([] as Joke[]);
  const [loadingJokes, setLoadingJokes] = useState(true);
  const [errorMessage, setErrorMessage] = useState({
    errorMessage: "",
  });

  useEffect(() => {
    const load = async () => {
      let loadJokeArr = [] as Joke[];
      try {
        while (loadJokeArr.length !== numberOfJokes) {
          let loadData = await fetch(
            `${configURL.api.jokesRandom}?category=${props.category}`
            // `${configURL.api.jokesRandom}akshgf?category=${props.category}`
          );
          if (!loadData.ok) throw new Error(`${loadData.status}`);
          let data: Joke = await loadData.json();
          loadJokeArr.push(data);
        }
        setErrorMessage(() => ({
          errorMessage: "",
        }));
      } catch (errJokeCat) {
        setErrorMessage(() => ({
          errorMessage: `Error loading jokes in this category (${errJokeCat})`,
        }));
      }
      // https://stackoverflow.com/a/56757215/14539184
      loadJokeArr = loadJokeArr.filter(
        (joke, index, arr) => arr.findIndex((t) => t.id === joke.id) === index
      );
      loadJokeArr = loadJokeArr.slice(0, topFive);
      setJokeArr(loadJokeArr);
      setLoadingJokes(false);
    };
    load();
  }, []);
  return (
    <DivContainer>
      {errorMessage.errorMessage !== "" && (
        <DivErrorPopup>
          <p>{errorMessage.errorMessage}</p>
          <DivImg>
            <ImgLeft src={revolver} alt="revolver" />
            <ImgRight src={revolver} alt="revolver" />
          </DivImg>
        </DivErrorPopup>
      )}
      {loadingJokes ? (
        <div>Loading jokes ...</div>
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
    </DivContainer>
  );
};
