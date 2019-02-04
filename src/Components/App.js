import React, { Component } from "react";
import "./App.scss";
import Board from "./Board/Board";
import sudoku from "sudoku-umd";

let data = sudoku.generate("easy").split("");

class App extends Component {
  state = {
    initialBoard: data,
    board: data
  };

  handleTileChange = (e, id) => {
    const ID = id;
    const updateBoard = [...this.state.board].map((element, i) => {
      if (i === ID) return (element = e.target.value);
      else return element;
    });
    this.setState({
      board: updateBoard
    });
  };

  render() {
    return (
      <div className="container">
        <h1>Sudoku game</h1>
        <Board
          change={this.handleTileChange}
          initialBoard={this.state.initialBoard}
          board={this.state.board}
        />
      </div>
    );
  }
}

export default App;