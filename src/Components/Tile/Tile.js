import React from "react";
import "./Tile.scss";

const Tile = props => {
  return (
    <input
      className="tile__input"
      type="number"
      min="1"
      max="9"
      value={props.value !== "." ? props.value : ""}
      onChange={e => props.change(e, props.id)}
    />
  );
};

export default Tile;
