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
  justify-content: center;
  align-items: center;
`;

const DivButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const DivButtons = styled.div`
  width: 83vh;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

const Button = styled.button`
  width: 8vh;
  height: 8vh;
  font-size: 3.5vh;
  background: ${theme.redux.black};
  color: ${theme.redux.white};
  margin: 1px;
  border: none;
  :hover {
    background: ${theme.redux.white};
    color: ${theme.redux.black};
  }
`;

const OrangeButton = styled(Button)`
  background: ${theme.redux.white};
  color: ${theme.redux.orange};

  :hover {
    background: ${theme.redux.white};
    color: ${theme.redux.orange};
  }
`;

const DivCount = styled.div`
  width: fit-content;
  min-width: 200px;
  height: 200px;
  font-size: 5em;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${theme.redux.white};
  margin: 1em;
  padding: 1em;
  border-radius: 10px;
`;

export const ReduxCounter = () => {
  let count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  return (
    <DivContainer>
      <DivCount>{count}</DivCount>
      <DivButtonsContainer>
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
          <OrangeButton onClick={() => dispatch(clear())}>
            <div>C</div>
          </OrangeButton>
        </DivButtons>
      </DivButtonsContainer>
    </DivContainer>
  );
};
