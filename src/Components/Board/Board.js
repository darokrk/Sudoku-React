import React from "react";
import Tile from "../Tile/Tile";
import "./Board.scss";

const Board = props => {
  const initialBoardStatus = props.initialBoard.map(field => {
    if (field === ".") return false;
    else return true;
  });
  const board = props.board.map((field, i) => (
    <Tile
      key={i}
      id={i}
      value={field}
      change={props.change}
      disabled={initialBoardStatus[i]}
    />
  ));
  return <div className="board">{board}</div>;
};

export default Board;
