import { Col, Row } from "react-bootstrap";
import { theme } from "../../theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { Component } from "react";
import styled from "styled-components";

const DivContainer = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  height: 100%;
  width: 100%;
  min-width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DivTasks = styled.div`
  position: absolute;
  top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 80vw;
  min-width: fit-content;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
`;

const DivInput = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${theme.colors.white};
  height: 15%;
  width: 100%;
  border-radius: 10px;

  :hover {
    cursor: text;
  }
`;

const DivCheckAllButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: ${theme.colors.primaryFaded};

  :hover {
    color: ${theme.colors.primary};
    cursor: pointer;
  }
`;

const InputField = styled.input`
  padding: 2%;
  background-color: ${theme.colors.white};
  color: ${theme.colors.secondary};
  border: none;
  cursor: pointer;
  border-radius: 10px;
  text-align: center;

  :hover {
    cursor: text;
  }

  ::placeholder {
    color: ${theme.colors.primaryFaded};
    font-style: italic;
  }

  :focus {
    outline: none;
  }
`;

const DivUl = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: absolute;
  top: 16%;
  max-height: 70%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const UlTasks = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const LiTask = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  scroll-snap-align: start;
  width: 100%;
  cursor: pointer;
  background-color: ${theme.colors.primaryFaded};
  color: ${theme.colors.white};
  margin: 2px 0;
  border-radius: 10px;
  overflow-x: hidden;
  overflow-y: visible;
  word-wrap: break-word;
  padding: 2px 0;
`;

const InputCheckbox = styled.input`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: transparent;
  border: 2px solid ${theme.colors.white};
  vertical-align: middle;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;

  :checked {
    background-color: ${theme.colors.white};
  }
`;

const H2TaskName = styled.div<{ strikethrough: string }>`
  text-decoration: ${(props) =>
    props.strikethrough ? "line-through" : "none"};
  text-decoration-color: ${theme.colors.white};
  text-decoration-thickness: 2px;


  :hover {
    cursor: pointer;
    button {
      color: ${theme.colors.primaryFaded};
      text-decoration: none !important;
    }
`;

const UlFiltered = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  list-style-type: none;
  padding: 0;
`;

const LiFiltered = styled.li``;

const ButtonFiltered = styled.button<{ selected: boolean }>`
  border: 0;
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: ${theme.colors.white};
  color: ${theme.colors.primaryFaded};
  border-radius: 10px;

  :hover {
    background: ${theme.colors.primaryFaded};
    color: ${theme.colors.white};
  }

  background: ${(props) =>
    props.selected ? `${theme.colors.primaryFaded}` : `${theme.colors.white}`};

  color: ${(props) =>
    props.selected ? `${theme.colors.white}` : `${theme.colors.primaryFaded}`};
`;

const DivNumOfTasks = styled.div`
  display: flex;
  color: ${theme.colors.white};
`;

const ButtonDestroy = styled.button`
  background: ${theme.colors.background};
  color: ${theme.colors.primaryFaded};
  border: none;

  :hover {
    color: ${theme.colors.white};
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
  constructor(props: Props) {
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

  addTask(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ value: event.currentTarget.value });
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
              <Col xs="2" md="1">
                <DivCheckAllButton
                  className="text-center"
                  onClick={this.checkAll}
                >
                  <ExpandMoreIcon className="fs-1" />
                </DivCheckAllButton>
              </Col>
              <Col xs="8" md="10">
                <InputField
                  type="text"
                  onChange={this.addTask}
                  value={this.state.value}
                  required={true}
                  placeholder="What will you do today?"
                  id="input"
                  className="h-100 w-100"
                />
              </Col>
            </Form>
          </DivInput>
          <DivUl>
            <UlTasks>
              {filteredArr
                .slice(0)
                .reverse()
                .map((task, index) => {
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
                      <Col xs="2" md="1" className="text-center">
                        <InputCheckbox
                          className="round-checkbox text-center"
                          type="checkbox"
                          checked={task.status}
                        ></InputCheckbox>
                      </Col>
                      <Col xs="10">
                        <H2TaskName strikethrough={task.status ? "true" : ""}>
                          {task.name}
                        </H2TaskName>
                      </Col>
                      <Col xs="1" className="d-flex justify-content-center">
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
          </DivUl>
        </DivTasks>
        <DivNumOfTasks id="numOfTasks">
          {this.state.tasks.filter((elem) => {
            return !elem.status;
          }).length + " unfinished tasks"}
        </DivNumOfTasks>
        <UlFiltered>
          <LiFiltered>
            <ButtonFiltered
              selected={
                !this.state.isActive && !this.state.isCompleted ? true : false
              }
              onClick={this.showAll}
            >
              All
            </ButtonFiltered>
          </LiFiltered>
          <LiFiltered>
            <ButtonFiltered
              selected={this.state.isActive ? true : false}
              onClick={this.showActive}
            >
              Active
            </ButtonFiltered>
          </LiFiltered>
          <LiFiltered>
            <ButtonFiltered
              selected={this.state.isCompleted ? true : false}
              onClick={this.showInactive}
            >
              Completed
            </ButtonFiltered>
          </LiFiltered>
        </UlFiltered>
      </DivContainer>
    );
  }
}
