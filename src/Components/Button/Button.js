import React from "react";
import "./Button.scss";

const Button = props => {
  return (
    <button
      className={`button button--${props.class}`}
      onClick={() => props.click(props.board)}
    >
      {props.name}
    </button>
  );
};

export default Button;
