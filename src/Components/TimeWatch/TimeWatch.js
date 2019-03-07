import React from "react";
import "./TimeWatch.scss";

const TimeWatch = props => {
  const { minutes, seconds } = props.time;
  const timeFormat = (minutes, seconds) => {
    if (seconds > 9) return `0${minutes}:${seconds}`;
    return ` 0${minutes}:0${seconds}`;
  };
  return (
    <p className="timeWatch">
      Your Time
      {timeFormat(minutes, seconds)}
      <strong>{` ${props.gameLevel}`}</strong>
    </p>
  );
};

export default TimeWatch;
