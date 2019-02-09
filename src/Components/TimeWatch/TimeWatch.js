import React from "react";
import "./TimeWatch.scss";

const TimeWatch = props => {
  const { minutes, seconds } = props.time;
  return (
    <p className="timeWatch">
      {`Your Time
      ${minutes > 9 ? `${minutes}` : `0${minutes}`}:${
        seconds > 9 ? `${seconds}` : `0${seconds}`
      }
    `}
    </p>
  );
};

export default TimeWatch;
