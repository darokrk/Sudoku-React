// import React from "react";
import React from "react";
import "./Tile.scss";

const Tile = props => {
  return (
    <td
      className={
        props.id === 2 || props.id === 5
          ? "table__data table__data--border"
          : "table__data"
      }
    >
      <input
        className="tile__input"
        type="number"
        min="1"
        max="9"
        value={props.value}
        onChange={e => props.change(e, props.id, props.rowIndex)}
        disabled={props.disabled}
      />
    </td>
  );
};

export default Tile;
