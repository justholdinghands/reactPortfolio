import "./Todo.css";
import { Task } from "./Task";
import React, { Component } from "react";
import styled, { css } from "styled-components";

type State = {
  tasks: Task[];
  value: string;
  idInc: number;
  isActive: boolean;
  isCompleted: boolean;
};

type Props = {};

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
    // this.makeEditable = this.makeEditable.bind(this);
    // this.editValue = this.editValue.bind(this);
  }

  addToArr(event) {
    event.preventDefault();
    var newTask = new Task(false, this.state.value, this.state.idInc); // active == false
    var arr = this.state.tasks;
    arr.push(newTask);
    this.setState({ tasks: arr, value: "", idInc: this.state.idInc + 1 });
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

  deleteFnc(i) {
    var deletedArr = this.state.tasks;
    deletedArr = deletedArr.filter((item) => {
      return item.id !== i;
    });
    // deletedArr.splice(i, 1);
    this.setState({
      tasks: deletedArr,
    });
  }

  checkAll(): void {
    var checkAllArr: Task[];
    if (this.state.tasks.every((each) => each.status === true)) {
      checkAllArr = this.state.tasks.map((i) => {
        i.status = false;
        return i;
      });
    } else {
      checkAllArr = this.state.tasks.map((i) => {
        i.status = true;
        return i;
      });
    }
    this.setState({
      tasks: checkAllArr,
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

  // makeEditable(e) {
  //   e.target.contentEditable = "true";
  // }

  // editValue(e,i) {
  //   console.log(e.currentTarget.textContent)
  //   var newArr = this.state.tasks;
  //   newArr[i].name = e.currentTarget.innerText;
  //   this.setState({
  //     tasks: newArr
  //   })
  // }else {}

  render() {
    // var striked = document.querySelectorAll('input[checked="true"][type="checkbox"]');
    // striked.forEach((item)=>{
    //   item.style.textDecoration="line-through";
    // })
    // console.log(striked)

    let filteredArr: Task[];
    let listItems: NodeListOf<Element>;

    if (this.state.isActive) {
      filteredArr = this.state.tasks.filter((item) => !item.status);
    } else if (this.state.isCompleted) {
      filteredArr = this.state.tasks.filter((item) => item.status);
    } else {
      filteredArr = this.state.tasks;

      //  do <li>:  </li>onInput={(e) => this.editValue(e,index)} onClick={this.makeEditable}
    }

    // listItems = filteredArr.map((task, index) => {
    //   return (
    //     <li className={"task"} key={task.name + index}>
    //       <input
    //         className="round-checkbox"
    //         type="checkbox"
    //         onChange={() => this.isChecked(task.id)}
    //         checked={task.status}
    //       ></input>
    //       <div className={task.status ? "strikethrough" : ""}>{task.name}</div>
    //       <button className="destroy" onClick={() => this.deleteFnc(task.id)}>
    //         x
    //       </button>
    //     </li> //default - All
    //   );
    // });

    return (
      <div id="container" className="todo">
        <h1>todos</h1>
        <div id="block">
          <form onSubmit={this.addToArr}>
            <button id="checkAllBtn" type="button" onClick={this.checkAll}>
              ❯
            </button>
            <input
              type="text"
              onChange={this.addTask}
              value={this.state.value}
              required={true}
              placeholder="What needs to be done?"
              id="input"
            />
          </form>
          <ul>
            {filteredArr.map((task, index) => {
              return (
                <li className={"task"} key={task.name + index}>
                  <input
                    className="round-checkbox"
                    type="checkbox"
                    onChange={() => this.isChecked(task.id)}
                    checked={task.status}
                  ></input>
                  <div className={task.status ? "strikethrough" : ""}>
                    {task.name}
                  </div>
                  <button
                    className="destroy"
                    onClick={() => this.deleteFnc(task.id)}
                  >
                    x
                  </button>
                </li> //default - All
              );
            })}
          </ul>
          <div id="numOfTasks">
            {this.state.tasks.filter((elem) => {
              return !elem.status;
            }).length + " items left"}
          </div>
        </div>
        <div id="filter">
          <ul>
            <li>
              <button
                className={
                  !this.state.isActive && !this.state.isCompleted
                    ? "selected"
                    : ""
                }
                onClick={this.showAll}
              >
                All
              </button>
            </li>
            <li>
              <button
                className={this.state.isActive ? "selected" : ""}
                onClick={this.showActive}
              >
                Active
              </button>
            </li>
            <li>
              <button
                className={this.state.isCompleted ? "selected" : ""}
                onClick={this.showInactive}
              >
                Completed
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
