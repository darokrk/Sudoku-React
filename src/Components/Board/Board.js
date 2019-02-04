import React from "react";
import Tile from "../Tile/Tile";
import "./Board.scss";

const Board = props => {
  const board = props.board.map((field, i) => (
    <Tile key={i} id={i} value={field} change={props.change} />
  ));
  return <div className="board">{board}</div>;
};

export default Board;
