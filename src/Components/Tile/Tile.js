// import React from "react";
import React from "react";
import "./Tile.scss";

const Tile = props => {
  return (
    <td
      className={
        props.id === 2 || props.id === 5
          ? "board__data board__data--border"
          : "board__data"
      }
    >
      <input
        className="board__input"
        type="number"
        min="1"
        max="9"
        value={props.value}
        onChange={e => props.change(e, props.id, props.rowIndex)}
        readOnly={props.readOnly}
      />
    </td>
  );
};

export default Tile;
