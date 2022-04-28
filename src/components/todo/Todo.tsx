import { Button, Col, Row } from "react-bootstrap";
import { theme } from "../../theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { Component } from "react";
import styled, { css } from "styled-components";

const DivContainer = styled.div`
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DivTasks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 70%;
  width: 70%;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
`;

const DivInput = styled.div`
  top: 0;
  display: flex;
  flex-direction: row;
  background: ${theme.todo.white};
  height: 60px;
  width: 100%;
  border-radius: 10px;
  gap: 0;
`;

const DivCheckAllButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: ${theme.todo.primary};
`;

const InputField = styled.input`
  padding: 2%;
  background-color: ${theme.todo.white};
  color: ${theme.todo.secondary};
  border: none;
  cursor: pointer;
  border-radius: 10px;

  ::placeholder {
    color: ${theme.todo.primary};
    font-style: italic;
  }

  :focus {
    outline: none;
  }
`;

const UlTasks = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  position: absolute;
  height: 78%;
  width: 100%;
  padding: 0;
  bottom: 0;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const LiTask = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  scroll-snap-align: start;
  width: 100%;
  cursor: pointer;
  background-color: ${theme.todo.primary};
  color: ${theme.todo.white};
  margin: 2px 0;
  border-radius: 10px;
`;

const H2TaskName = styled.div<{ strikethrough: string }>`
  text-decoration: ${(props) =>
    props.strikethrough ? "line-through" : "none"};
  text-decoration-color: ${theme.todo.white};
  text-decoration-thickness: 4px;


  :hover {
    cursor: pointer;
    button {
      color: ${theme.todo.primary};
      text-decoration: none !important;
    }
`;

const InputCheckbox = styled.input`
  width: 20px;
  height: 20px;
  background-color: ${theme.todo.white};
  border-radius: 50%;
  vertical-align: middle;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;

  :checked {
    background-color: transparent;
  }
`;
const UlFiltered = styled.ul``;

const LiFiltered = styled.li``;
const ButtonFiltered = styled.button<{ selected: string }>`
  border: 0;
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: ${theme.todo.base};
  color: ${theme.todo.primary};
  border-radius: 10px;

  background: ${(props) =>
    props.selected ? `${theme.todo.primary}` : `${theme.todo.white}`};

  color: ${(props) =>
    props.selected ? `${theme.todo.white}` : `${theme.todo.primary}`};
`;

const DivNumOfTasks = styled.div`
  color: ${theme.todo.white};
`;

const ButtonDestroy = styled.button`
  background: ${theme.todo.background};
  color: ${theme.todo.primary};
  border: none;
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
      const newTask = {
        status: false,
        name: prevState.value,
        id: prevState.idInc,
      };
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

  isChecked(i: number) {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === i ? { ...task, status: !task.status } : task
      ),
    }));
  }

  deleteFnc(i: number) {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((item) => item.id !== i),
    }));
  }

  checkAll() {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        prevState.tasks.every((each) => each.status === true)
          ? { ...task, status: false }
          : { ...task, status: true }
      ),
    }));
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
      <DivContainer id="container">
        <DivTasks id="block">
          <DivInput>
            <Form onSubmit={(e) => this.addToArr(e)} className="flex-row">
              <Col xs="3" md="2">
                <DivCheckAllButton
                  className="text-center"
                  onClick={this.checkAll}
                >
                  <ExpandMoreIcon className="fs-1" />
                </DivCheckAllButton>
              </Col>
              <Col xs="9" md="10">
                <InputField
                  type="text"
                  onChange={this.addTask}
                  value={this.state.value}
                  required={true}
                  placeholder="What needs to be done?"
                  id="input"
                  className="h-100 w-100"
                />
              </Col>
            </Form>
          </DivInput>
          <UlTasks>
            {filteredArr.map((task, index) => {
              return (
                <LiTask
                  key={task.name + index}
                  onClick={() => this.isChecked(task.id)}
                  onMouseOver={() =>
                    document
                      .querySelector(".task .destroy")!
                      .classList.toggle("d-none")
                  }
                >
                  <Col xs="3" md="2" className="text-center">
                    <InputCheckbox
                      className="round-checkbox text-center"
                      type="checkbox"
                      checked={task.status}
                    ></InputCheckbox>
                  </Col>
                  <Col xs="8" md="9">
                    <H2TaskName strikethrough={task.status ? "true" : ""}>
                      {task.name}
                    </H2TaskName>
                  </Col>
                  <Col xs="1">
                    <ButtonDestroy
                      className="destroy d-block"
                      onClick={() => this.deleteFnc(task.id)}
                    >
                      x
                    </ButtonDestroy>
                  </Col>
                </LiTask>
              );
            })}
          </UlTasks>
        </DivTasks>
        <Row>
          <DivNumOfTasks id="numOfTasks">
            {this.state.tasks.filter((elem) => {
              return !elem.status;
            }).length + " unfinished tasks"}
          </DivNumOfTasks>
        </Row>
        <div id="filter" className="d-flex flex-row justify-content-center">
          <UlFiltered className="d-flex flex-row w-50 justify-content-around list-unstyled">
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
        </div>
      </DivContainer>
    );
  }
}
