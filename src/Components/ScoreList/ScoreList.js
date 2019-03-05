import React from "react";
import Result from "../Result/Result";
import "./ScoreList.scss";

const ScoreList = props => {
  const results = props.finishedTime.map((item, i) => (
    <Result key={i} finishedTime={item} />
  ));
  results.sort((a, b) => b - a);
  return <ul className="score-list">{results}</ul>;
};

export default ScoreList;
