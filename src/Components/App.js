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
    const updateBoard = [...this.state.board].map((element, i) => {
      if (i === id) return (element = e.target.value);
      else return element;
    });
    this.setState({
      board: updateBoard
    });
  };

  handleRestart = () => {
    this.setState({
      board: this.state.initialBoard
    });
  };

  handleNewGame = () => {
    data = sudoku.generate("medium").split("");
    this.setState({
      initialBoard: data,
      board: data
    });
  };

  handleSolve = actualBoard => {
    let solveBoard = sudoku.solve(actualBoard);
    if (solveBoard) {
      solveBoard = solveBoard.split("");
      this.setState({
        board: solveBoard
      });
    } else return alert("You make some mistake, your sudoku can't be solved!");
  };

  handleCheck = actualBoard => {
    let solveBoard = sudoku.solve(actualBoard);
    if (solveBoard) return alert("Keep going you can solve it :)");
    else return alert("You make some mistake, fix some Tiles");
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
        <button onClick={() => this.handleCheck(this.state.board)}>
          Check
        </button>
        <button onClick={this.handleNewGame}>New Game</button>
        <button onClick={() => this.handleSolve(this.state.board)}>
          Solve
        </button>
        <button onClick={this.handleRestart}>Restart</button>
      </div>
    );
  }
}

export default App;
