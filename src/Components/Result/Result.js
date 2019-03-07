import React from "react";

const Result = props => {
  const { minutes, seconds } = props.finishedTime;
  return (
    <li>{`${minutes > 9 ? `${minutes}` : `0${minutes}`} : ${
      seconds > 9 ? `${seconds}` : `0${seconds}`
    }`}</li>
  );
};

export default Result;
