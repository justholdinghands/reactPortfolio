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
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled.button`
  width: 8vh;
  height: 8vh;
  font-size: 3.5vh;
  background: ${theme.colors.primaryFaded};
  color: ${theme.colors.white};
  margin: 1px;
  border: none;
  :hover {
    background: ${theme.colors.white};
    color: ${theme.colors.grey};
  }
`;

const ResetButton = styled(Button)`
  background: ${theme.colors.white};
  color: ${theme.colors.primary};

  :hover {
    background: ${theme.colors.white};
    color: ${theme.colors.primary};
  }
`;

const DivCount = styled.div`
  width: fit-content;
  min-width: 200px;
  max-width: 90vw;
  height: 200px;
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
        <ResetButton onClick={() => dispatch(clear())}>
          <div>C</div>
        </ResetButton>
      </DivButtons>
    </DivContainer>
  );
};
