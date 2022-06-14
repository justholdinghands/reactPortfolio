import { theme } from "../../theme";
import { useAppDispatch, useAppSelector } from "./hooks";
import counterSlice, {
  clear,
  decrement,
  divide,
  increment,
  multiply,
  power,
  selectCount,
} from "./counterSlice";
import styled from "styled-components";

const DivContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const DivButtons = styled.div`
  display: grid;
  width: 50%;

  @media (min-width: 768px) {
    grid-template-columns: repeat(5, minmax(3rem, 1fr));
    grid-auto-rows: 4rem;
  }

  @media (max-width: 768px) {
    min-width: 200px;
    max-width: 90vw;
    grid-template-columns: repeat(3, minmax(3rem, 1fr));
    grid-auto-rows: 4rem;
  }
`;

const Button = styled.button`
  font-size: 3.5vh;
  background: ${theme.colors.primaryFaded};
  color: ${theme.colors.white};
  margin: 2px;
  border: none;
  width: -webkit-fill-available;
  :hover {
    background: ${theme.colors.white};
    color: ${theme.colors.grey};
  }
`;

const ResetButton = styled(Button)`
  background: ${theme.colors.white};
  color: ${theme.colors.primary};

  @media (max-width: 768px) {
    grid-column: 1 / 4;
  }

  :hover {
    background: ${theme.colors.white};
    color: ${theme.colors.primary};
  }
`;

const DivCount = styled.div`
  width: fit-content;
  width: 50%;
  height: 12rem;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  font-size: 5em;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background: ${theme.colors.white};
  border-radius: 10px;
`;

export const ReduxCounter = () => {
  let count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  return (
    <DivContainer>
      <DivCount>{count}</DivCount>
      <DivButtons>
        <Button onClick={() => dispatch(increment(1))}>+1</Button>
        <Button onClick={() => dispatch(increment(2))}>+2</Button>
        <Button onClick={() => dispatch(decrement(1))}>-1</Button>
        <Button onClick={() => dispatch(decrement(2))}>-2</Button>
        <Button onClick={() => dispatch(multiply(2))}>*2</Button>
        <Button onClick={() => dispatch(divide(2))}>&#247;2</Button>
        <Button onClick={() => dispatch(power(2))}>
          x<sup>2</sup>
        </Button>
        <Button onClick={() => dispatch(power(count))}>
          x<sup>x</sup>
        </Button>
        <Button onClick={() => dispatch(power(1 / 2))}>&#8730;x</Button>
        <ResetButton className="reset" onClick={() => dispatch(clear())}>
          <div>C</div>
        </ResetButton>
      </DivButtons>
    </DivContainer>
  );
};
