/** pridat
 *  button "delete all completed"
 *  ... ked zacina scrolling, id="block" dat overflow-hidden pred klikom na ..., po kliku toggle overflow-hidden na overflow-visible
 */

import { Button, Col, Row } from "react-bootstrap";
import { theme } from "../../theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { Component } from "react";
import styled, { css } from "styled-components";

const DivContainer = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.todo.base};

  * {
    padding: 0;
    margin: 0;
  } */

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const H1 = styled.h1`
  /* font: 7rem ${theme.todo.h1Font};
  color: ${theme.todo.accent}; */
`;

const DivBlock = styled.div`
  /* width: 50%;
  padding: 1rem;
  background-color: ${theme.todo.pale};
  border: 2px solid ${theme.todo.faded}; */
`;

const ButtonCheckAll = styled.button`
  /* font-size: xx-large;
  height: 0.5em;
  width: 5rem;
  transform: rotate(90deg);
  border: 0;
  background-color: ${theme.todo.pale};
  color: ${theme.todo.faded};
  cursor: pointer; */
`;

const InputTask = styled.input`
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: transparent;
  border: none;

  ::placeholder {
    color: pink;
    font-style: italic;
  }

  :focus {
    outline: none;
  }
`;

const Input = styled.input`
  width: 20px;
  height: 20px;
  background-color: ${theme.todo.white};
  border-radius: 50%;
  /* margin: 0.5em; */
  vertical-align: middle;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;

  :checked {
    background-color: ${theme.todo.accent};
  }
`;

const Form = styled.form`
  /* display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: center;
  height: 5rem;
  width: 100%;
  background-color: ${theme.todo.pale}; */
`;

const DivFilter = styled.div`
  /* display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50vw; */
`;

const UlFiltered = styled.ul`
  /* display: flex;
  flex-direction: row; */
`;

const LiFiltered = styled.li`
  /* list-style-type: none;
  color: ${theme.todo.primary};
  width: 100%;
  margin: 0.5rem;
  padding: 0.5rem;
  list-style-type: none;
  color: ${theme.todo.primary};
  width: 100%; */
`;
const ButtonFiltered = styled.button<{ selected: string }>`
  border: 0;
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: ${theme.todo.base};
  color: ${theme.todo.primary};
  border-radius: 10%;

  border: ${(props) =>
    props.selected ? `${theme.todo.faded}` + " 2px solid" : "white"}; // :D
`;

const DivTask = styled.div<{ strikethrough: string }>`
  text-decoration: ${(props) =>
    props.strikethrough ? "line-through" : "none"};
`;

const DivNumOfTasks = styled.div`
  /* padding-top: 1em;
  padding-left: 0.5em; */
`;

const ButtonDestroy = styled.button`
  /* width: 1em;
  height: 1em;
  border: 0; */
  color: red;
  background-color: yellow;
  /* vertical-align: middle;
  outline: none;
  cursor: pointer;
  font-size: x-large;
  text-decoration: none !important; */
`;

const TaskLi = styled.li`
  /* display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5vh;
  border: 0.5px solid ${theme.todo.faded};
  background-color: ${theme.todo.pale};
  list-style-type: none;
  color: ${theme.todo.primary};
  list-style-type: none; */

  :hover {
    cursor: pointer;
    button {
      color: ${theme.todo.primary};
      text-decoration: none !important;
    }
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
      <DivContainer
        id="container"
        className="d-flex flex-column justify-content-center align-items-center h-100 scrollbar-hidden"
      >
        {/* <H1>todos</H1> */}
        <div
          id="block"
          className="p-3 d-flex align-items-center"
          style={{
            height: "50vh",
            width: "80vw",
            maxWidth: "70vh",
            // border: "solid 2px blue",
          }}
        >
          <Col
            className="mh-100"
            style={{
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            <Row
              className="sticky-top py-2 g-0"
              style={{
                background: "white",
                borderRadius: "10px",
              }}
            >
              <form onSubmit={(e) => this.addToArr(e)}>
                <Row className="gx-0 align-items-center d-flex justify-content-evenly">
                  <Col xs="2" className="mx-0 px-0">
                    <div
                      id="checkAllBtn"
                      className="text-center"
                      onClick={this.checkAll}
                    >
                      <ExpandMoreIcon className="fs-1" />
                    </div>
                  </Col>
                  <Col xs="8" md="9" className="">
                    <InputTask
                      type="text"
                      onChange={this.addTask}
                      value={this.state.value}
                      required={true}
                      placeholder="What needs to be done?"
                      id="input"
                      className="w-100 h-100 px-0 px-md-3 text-center"
                    />
                  </Col>
                </Row>
              </form>
            </Row>
            <Row className="gx-0 d-flex flex-column-reverse flex-row align-items-center justify-content-evenly">
              {/* <ul
                className="d-flex flex-column-reverse"
                style={{ border: "2px solid green" }}
              > */}
              {filteredArr.map((task, index) => {
                return (
                  <Row /*TaskLi*/ /** here */
                    key={task.name + index}
                    onClick={() => this.isChecked(task.id)}
                    onMouseOver={() =>
                      document
                        .querySelector(".task .destroy")!
                        .classList.toggle("d-none")
                    }
                    className="gx-0 align-items-center d-flex justify-content-evenly"
                  >
                    <Col
                      className="text-center mx-0 px-0 gx-0 col-1"
                      style={{
                        height: "fit-content",
                      }}
                    >
                      <Input
                        className="round-checkbox text-center"
                        type="checkbox"
                        checked={task.status}
                      ></Input>
                    </Col>
                    <Col className="col-7" style={{ overflowWrap: "anywhere" }}>
                      <DivTask
                        className="text-center"
                        strikethrough={task.status ? "true" : ""}
                      >
                        {task.name}
                      </DivTask>
                    </Col>
                    <Col className="col-1" style={{ height: "fit-content" }}>
                      <ButtonDestroy
                        className="destroy d-block"
                        onClick={() => this.deleteFnc(task.id)}
                      >
                        x
                      </ButtonDestroy>
                    </Col>
                  </Row> //default - All
                );
              })}
              {/* </ul> */}
            </Row>
          </Col>
        </div>
        <Row>
          <DivNumOfTasks
            id="numOfTasks"
            style={{ color: `${theme.todo.faded}` }}
          >
            {this.state.tasks.filter((elem) => {
              return !elem.status;
            }).length + " items left"}
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
