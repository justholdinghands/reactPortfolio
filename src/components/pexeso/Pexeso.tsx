import { Component, useState } from "react";
import { theme } from "../../theme";
import Piece from "./Piece";
import styled from "styled-components";
//styles
const DivWrapper = styled.div`
  border: red 2px solid;
`;

//logic
type Props = {
  className?: string;
};

type Card = {
  name: string;
  image: string;
};

const cards = [
  {
    name: "a",
    image: "./imgs/worm1.jpg",
  },
  {
    name: "b",
    image: "./imgs/worm2.jpg",
  },
  {
    name: "c",
    image: "./imgs/worm3.jpg",
  },
  {
    name: "d",
    image: "./imgs/worm4.jpg",
  },
  {
    name: "e",
    image: "./imgs/worm5.jpg",
  },
  {
    name: "f",
    image: "./imgs/worm6.jpg",
  },
  {
    name: "g",
    image: "./imgs/worm7.jpg",
  },
  {
    name: "h",
    image: "./imgs/worm8.jpg",
  },
];

const Pexeso = (props: Props) => {
  function randomSort(array: Card[]) {
    return array.sort(() => 0.5 - Math.random());
  }

  const [matrix, setMatrix] = useState<Card[]>(
    randomSort([...cards, ...cards])
  );
  return (
    <DivWrapper>
      {matrix.map((e, index) => {
        return (
          <Piece
            key={e.name + index}
            index={index}
            name={e.name}
            image={e.image}
          ></Piece>
        );
      })}
      {/* <table>
        <tbody>
          {[...Array(4)].map((_, row) => {
            return (
              <tr key={row}>
                {[...Array(4)].map((_, column) => (
                  <td key={column}>
                    <Piece onClick={() => {}}> </Piece>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </DivWrapper>
  );
};

export default Pexeso;
