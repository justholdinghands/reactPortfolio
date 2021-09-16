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

const DivWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${theme.redux.grey};
`;

const DivButtons = styled.div`
  width: 50%;
  display: block;
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

const Button = styled.button`
  width: 200px;
  height: 200px;
  font-size: 2em;
  background: ${theme.redux.black};
  color: ${theme.redux.white};
  border: 2px ${theme.redux.grey} solid;
  :hover {
    background: ${theme.redux.white};
    color: ${theme.redux.black};
  }
`;

const OrangeButton = styled(Button)`
  background: ${theme.redux.orange};
  color: ${theme.redux.white};

  :hover {
    background: ${theme.redux.white};
    color: ${theme.redux.orange};
  }
`;

export const ReduxCounter = () => {
  let count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  return (
    <DivWrapper>
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
      <DivCount>{count}</DivCount>
    </DivWrapper>
  );
};
