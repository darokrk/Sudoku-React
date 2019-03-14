import React from "react";
import Button from "../Button/Button";
import "./Header.scss";

const Header = props => (
  <header className="header__wrapper">
    <h1 className="header__title">{`Sudoku Game`}</h1>
    <Button class={"pause"} name={"Pause"} click={props.pauseClick} />
  </header>
);

export default Header;
