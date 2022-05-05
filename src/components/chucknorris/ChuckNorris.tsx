import { JokesInCategory } from "./CategoryJokes";
import { Link, Route } from "react-router-dom";
import { theme } from "../../theme";
import { useEffect, useState } from "react";
import configURL from "./urlconfig.json";
import norris from "../../icons/norris.png";
import revolver from "./imgs/revolver.png";
import styled from "styled-components";

export const DivContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 95%;
  width: 100%;
  background-color: ${theme.colors.background};
  color: ${theme.colors.primary};
`;

const Navbar = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 5%;
  width: 80%;
`;

const UlCategories = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font: 2vh ${theme.fonts.fontFamily6};
  text-decoration: none;
  overflow-x: scroll;
  position: relative;
  padding-bottom: 1vh;

  ::-webkit-scrollbar-track {
    box-shadow: ${theme.shadows.shadow1};
    border-radius: 10px;
    border-radius: 10px;
  }

  ::-webkit-scrollbar {
    margin-left: 30px;
    float: left;
    height: 5px;
    background-color: ${theme.colors.primaryFaded};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: ${theme.shadows.shadow1};
    background-color: ${theme.colors.primary};
  }

  li {
    margin-right: 2em;
    a {
      color: ${theme.colors.primary};
      :hover {
        color: ${theme.colors.white};
      }
    }
  }
`;

export const DivAllJokes = styled.div`
  height: 95%;
  width: 80%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
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
  font: 2.5vh ${theme.fonts.fontFamily6};
`;

export const DivErrorPopup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${theme.colors.white};
  font: 5vh ${theme.fonts.fontFamily6};
  width: 80%;
  height: 100%;
  overflow: hidden;
`;

export const DivImg = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  flex-direction: row;
  width: 100%;
  margin-bottom: -3em;
  justify-content: space-between;
  align-items: flex-end;
  img {
    height: 10vh;
    width: 15vh;
  }
`;

const DivFade = styled.div`
  position: absolute;
  background: ${theme.colors.fadeBottom};
  width: 100%;
  height: 30px;
  bottom: 0;
  z-index: 2;
`;

export const ImgLeft = styled.img`
  transform: scaleX(-1);
`;

export const ImgRight = styled.img``;

const H1 = styled.h1`
  text-align: center;
  font: 5em ${theme.fonts.fontFamily7};
  color: ${theme.colors.secondary};
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

export const ChuckNorris = (props: Props) => {
  const [jokeArr, setJokeArr] = useState([] as Joke[]);
  const [categories, setCategories] = useState([] as Category[]);
  const [loadingJokes, setLoadingJokes] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorMessage, setErrorMessage] = useState({
    errorMessage: "",
  });

  useEffect(() => {
    const load = async () => {
      const loadJokeArr = [] as Joke[];
      try {
        while (loadJokeArr.length !== numberOfJokes) {
          let loadData = await fetch(configURL.api.jokesRandom);
          if (!loadData.ok) throw new Error(`${loadData.status}`);
          let data = await loadData.json();
          if (!loadJokeArr.some((element) => element.value === data.value)) {
            loadJokeArr.push(data);
          }
          setErrorMessage(() => ({
            errorMessage: "",
          }));
        }
        setJokeArr([...loadJokeArr]);
        setLoadingJokes(false);
        try {
          const loadCategories = await fetch(configURL.api.categories);
          if (!loadCategories.ok) throw new Error(`${loadCategories.status}`);
          const listCategories = await loadCategories.json();
          setErrorMessage(() => ({
            errorMessage: "",
          }));
          setCategories([...listCategories]);
          setLoadingCategories(false);
        } catch (errCat) {
          setErrorMessage(() => ({
            errorMessage: `Error loading categories (${errCat})`,
          }));
        }
      } catch (errJoke) {
        setLoadingCategories(false);
        setErrorMessage(() => ({
          errorMessage: `Error loading jokes (${errJoke})`,
        }));
      }
    };
    load();
  }, []);

  return (
    <DivContainer>
      {errorMessage.errorMessage && (
        <DivErrorPopup>
          <p>{errorMessage.errorMessage}</p>
          <DivImg>
            <ImgLeft src={revolver} alt="revolver" />
            <ImgRight src={revolver} alt="revolver" />
          </DivImg>
        </DivErrorPopup>
      )}
      {loadingCategories ? (
        <p>Loading Categories ...</p>
      ) : (
        <Navbar>
          {!errorMessage.errorMessage && (
            <UlCategories>
              <li>
                <Link to={configURL.portfolioSite.baseURL}>#all</Link>
              </li>
              {categories.map((category, index) => (
                <li key={index}>
                  <Link to={`${configURL.portfolioSite.baseURL}/${category}`}>
                    #{category}
                  </Link>
                </li>
              ))}
            </UlCategories>
          )}
        </Navbar>
      )}
      {categories.map((category) => (
        <Route
          key={`${category}`}
          path={`${configURL.portfolioSite.baseURL}/${category}`}
        >
          <JokesInCategory category={category}></JokesInCategory>
        </Route>
      ))}
      <Route exact path={configURL.portfolioSite.baseURL}>
        {loadingJokes ? (
          <div>Loading Jokes ...</div>
        ) : (
          <>
            <DivAllJokes>
              {jokeArr.map((joke, index) => (
                <DivJokeWrapper key={index}>
                  <img src={norris} alt="chuckhead" />
                  <DivJoke>{joke.value}</DivJoke>
                </DivJokeWrapper>
              ))}
            </DivAllJokes>
            <DivFade></DivFade>
          </>
        )}
      </Route>
    </DivContainer>
  );
};
