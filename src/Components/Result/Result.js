import React from "react";

const Result = props => {
  const { minutes, seconds } = props.finishedTime;
  const timeFormat = (minutes, seconds) => {
    if (seconds > 9) return `0${minutes}:${seconds}`;
    return ` 0${minutes}:0${seconds}`;
  };
  return <li>{timeFormat(minutes, seconds)}</li>;
};

export default Result;
