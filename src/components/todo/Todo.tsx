import "./Todo.css";
// import { Task } from "./Task";
import { theme } from "../../theme";
import React, { Component } from "react";
import styled, { css } from "styled-components";

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.todo_base};

  * {
    padding: 0;
    margin: 0;
  }
`;

const H1 = styled.h1`
  font: 7rem ${theme.todo_h1_font};
  color: ${theme.todo_accent};
`;

const DivBlock = styled.div`
  width: 50%;
  padding: 1rem;
  background-color: ${theme.todo_pale};
  border: 2px solid ${theme.todo_faded};
`;

const ButtonCheckAll = styled.button`
  font-size: xx-large;
  height: 0.5em;
  width: 5rem;
  transform: rotate(90deg);
  border: 0;
  background-color: ${theme.todo_pale};
  color: ${theme.todo_faded};
  cursor: pointer;
`;

const InputTask = styled.input`
  width: 80%;
  height: 100%;
  border: 0;
  background-color: ${theme.todo_pale};

  ::placeholder {
    color: ${theme.todo_faded};
    font-size: x-large;
    font-style: italic;
  }
`;

const Input = styled.input`
  width: 2em;
  height: 2em;
  background-color: white;
  border-radius: 50%;
  margin: 0.5em;
  vertical-align: middle;
  border: 1px solid #ddd;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;

  :checked {
    background-color: ${theme.todo_accent};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: center;
  height: 5rem;
  width: 100%;
  background-color: ${theme.todo_pale};
`;

const DivFilter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50vw;
`;

const UlFiltered = styled.ul`
  display: flex;
  flex-direction: row;
`;

const LiFiltered = styled.li`
  list-style-type: none;
  color: ${theme.todo_primary};
  width: 100%;
  margin: 0.5rem;
  padding: 0.5rem;
  list-style-type: none;
  color: ${theme.todo_primary};
  width: 100%;
`;
const ButtonFiltered = styled.button<{ selected: string }>`
  border: 0;
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: ${theme.todo_base};
  color: ${theme.todo_primary};
  border-radius: 10%;

  border: ${(props) =>
    props.selected ? `${theme.todo_faded}` + " 2px solid" : "white"}; // :D

  :hover {
    cursor: pointer;
  }
`;

const DivTask = styled.div<{ strikethrough: string }>`
  text-decoration: ${(props) =>
    props.strikethrough ? "line-through" : "none"};
`;

const DivNumOfTasks = styled.div`
  padding-top: 1em;
  padding-left: 0.5em;
`;

const TaskLi = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5vh;
  border: 0.5px solid ${theme.todo_faded};
  background-color: ${theme.todo_pale};
  list-style-type: none;
  color: ${theme.todo_primary};
  width: 100%;
  list-style-type: none;
`;

const ButtonDestroy = styled.button`
  width: 1em;
  height: 1em;
  border: 0;
  color: ${theme.todo_pale};
  background-color: ${theme.todo_pale};
  vertical-align: middle;
  outline: none;
  cursor: pointer;
  font-size: x-large;
  text-decoration: none !important;

  :hover {
    color: #7b7777;
    text-decoration: none !important;
  }
`;

type State = {
  tasks: Task[];
  value: string;
  idInc: number;
  isActive: boolean;
  isCompleted: boolean;
};

type Props = {};

type Task = {
  status: boolean;
  name: string;
  id: number;
};

export default class Todo extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      value: "",
      idInc: 0,
      isActive: false,
      isCompleted: false,
    };
    this.addToArr = this.addToArr.bind(this);
    this.addTask = this.addTask.bind(this);
    this.isChecked = this.isChecked.bind(this);
    this.deleteFnc = this.deleteFnc.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.showActive = this.showActive.bind(this);
    this.showInactive = this.showInactive.bind(this);
    this.showAll = this.showAll.bind(this);
  }

  addToArr(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.setState((prevState) => {
      var newTask = {
        status: false,
        name: prevState.value,
        id: prevState.idInc,
      }; // active == false
      return {
        tasks: [...prevState.tasks, newTask],
        value: "",
        idInc: prevState.idInc + 1,
      };
    });
  }

  addTask(event) {
    this.setState({ value: event.target.value });
  }

  isChecked(i) {
    var newArr = this.state.tasks;
    var pos = newArr
      .map(function (e) {
        return e.id;
      })
      .indexOf(i);
    newArr[pos].status = !newArr[pos].status;
    this.setState({
      tasks: newArr,
    });
  }

  deleteFnc(i: number) {
    this.setState((prevState) => {
      var deletedArr = prevState.tasks;
      deletedArr = deletedArr.filter((item) => {
        return item.id !== i;
      });
      return {
        tasks: deletedArr,
      };
    });
  }

  checkAll(): void {
    // var checkAllArr: Task[];
    // if (this.state.tasks.every((each) => each.status === true)) {
    //   checkAllArr = this.state.tasks.map((i) => {
    //     i.status = false;
    //     return i;
    //   });
    // } else {
    //   checkAllArr = this.state.tasks.map((i) => {
    //     i.status = true;
    //     return i;
    //   });
    // }
    this.setState((prevState) => {
      var checkAllArr: Task[];
      if (prevState.tasks.every((each) => each.status === true)) {
        checkAllArr = prevState.tasks.map((i) => {
          i.status = false;
          return i;
        });
      } else {
        checkAllArr = prevState.tasks.map((i) => {
          i.status = true;
          return i;
        });
      }
      return {
        tasks: checkAllArr,
      };
    });
  }

  showActive() {
    this.setState({
      isActive: true,
      isCompleted: false,
    });
  }

  showInactive() {
    this.setState({
      isCompleted: true,
      isActive: false,
    });
  }

  showAll() {
    this.setState({
      isCompleted: false,
      isActive: false,
    });
  }

  render() {
    let filteredArr: Task[];

    if (this.state.isActive) {
      filteredArr = this.state.tasks.filter((item) => !item.status);
    } else if (this.state.isCompleted) {
      filteredArr = this.state.tasks.filter((item) => item.status);
    } else {
      filteredArr = this.state.tasks;
    }

    return (
      <DivContainer id="container" className="todo">
        <H1>todos</H1>
        <DivBlock id="block">
          <Form onSubmit={(e) => this.addToArr(e)}>
            <ButtonCheckAll
              id="checkAllBtn"
              type="button"
              onClick={this.checkAll}
            >
              ❯
            </ButtonCheckAll>
            <InputTask
              type="text"
              onChange={this.addTask}
              value={this.state.value}
              required={true}
              placeholder="What needs to be done?"
              id="input"
            />
          </Form>
          <ul>
            {filteredArr.map((task, index) => {
              return (
                <TaskLi className={"task"} key={task.name + index}>
                  <Input
                    className="round-checkbox"
                    type="checkbox"
                    onChange={() => this.isChecked(task.id)}
                    checked={task.status}
                  ></Input>
                  <DivTask strikethrough={task.status ? "true" : ""}>
                    {task.name}
                  </DivTask>
                  <ButtonDestroy
                    className="destroy"
                    onClick={() => this.deleteFnc(task.id)}
                  >
                    x
                  </ButtonDestroy>
                </TaskLi> //default - All
              );
            })}
          </ul>
          <DivNumOfTasks id="numOfTasks">
            {this.state.tasks.filter((elem) => {
              return !elem.status;
            }).length + " items left"}
          </DivNumOfTasks>
        </DivBlock>
        <DivFilter id="filter">
          <UlFiltered>
            <LiFiltered>
              <ButtonFiltered
                selected={
                  !this.state.isActive && !this.state.isCompleted ? "true" : ""
                }
                onClick={this.showAll}
              >
                All
              </ButtonFiltered>
            </LiFiltered>
            <LiFiltered>
              <ButtonFiltered
                selected={this.state.isActive ? "true" : ""}
                onClick={this.showActive}
              >
                Active
              </ButtonFiltered>
            </LiFiltered>
            <LiFiltered>
              <ButtonFiltered
                selected={this.state.isCompleted ? "true" : ""}
                onClick={this.showInactive}
              >
                Completed
              </ButtonFiltered>
            </LiFiltered>
          </UlFiltered>
        </DivFilter>
      </DivContainer>
    );
  }
}
