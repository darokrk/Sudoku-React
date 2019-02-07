import React from "react";
import uuid from "uuid";
import Tile from "../Tile/Tile";
import "./Board.scss";

const Board = props => {
  const initialBoardStatus = props.initialBoard.map(square => {
    return (square = square.map(field => {
      if (field === ".") return false;
      else return true;
    }));
  });
  const actualBoard = props.board.map((square, i) => {
    const squareIndex = i;
    const initialSquareFields = initialBoardStatus[i];
    square = square.map((field, i) => (
      <Tile
        key={uuid.v4()}
        id={i}
        square={squareIndex}
        value={field > 9 ? 9 : field && field < 1 ? 1 : field}
        change={props.change}
        disabled={initialSquareFields[i]}
      />
    ));
    return (
      <tr
        className={
          i === 2 || i === 5 ? "table__row table__row--border" : "table__row"
        }
        key={i}
      >
        {square}
      </tr>
    );
  });
  return (
    <table className="board">
      <tbody>{actualBoard}</tbody>
    </table>
  );
};

export default Board;
