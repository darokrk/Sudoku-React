import React from "react";
import Tile from "../Tile/Tile";
import "./Board.scss";

const Board = props => {
  const initialBoardStatus = [...props.initialBoard].map(row => {
    return (row = row.map(field => {
      if (field === ".") return false;
      else return true;
    }));
  });

  const actualBoard = [...props.board].map((row, i) => {
    const rowIndex = i;
    const initialRowFields = initialBoardStatus[i];
    row = row.map((field, i) => {
      return (
        <Tile
          key={i}
          id={i}
          rowIndex={rowIndex}
          value={field > 9 ? 9 : field && field < 1 ? 1 : field}
          change={props.change}
          disabled={initialRowFields[i]}
        />
      );
    });
    return (
      <tr
        className={
          i === 2 || i === 5 ? "table__row table__row--border" : "table__row"
        }
        key={i}
      >
        {row}
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
