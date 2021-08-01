import React, { Component } from "react";

type Props = {
  whatClass: string;
  text: string;
  func: () => void;
};

export default class Button extends Component<Props> {
  render() {
    let { whatClass, text, func } = this.props;
    return (
      <button className={whatClass} onClick={func}>
        {text}
      </button>
    );
  }
}
