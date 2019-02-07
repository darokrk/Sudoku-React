import React, { Component } from "react";
import "./App.scss";
import Board from "./Board/Board";
import sudoku from "sudoku-umd";

let data = sudoku.generate("easy");
console.log([...data]);
data = sudoku.board_string_to_grid(data);

class App extends Component {
  state = {
    initialBoard: data,
    board: data
  };

  handleTileChange = (e, id, squareNumber) => {
    const updateBoard = [...this.state.board].map((square, i) => {
      if (i === squareNumber) {
        return (square = square.map((field, i) => {
          if (i === id) return (field = e.target.value);
          else return field;
        }));
      } else return square;
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
    data = sudoku.generate("easy");
    data = sudoku.board_string_to_grid([...data]);
    this.setState({
      initialBoard: data,
      board: data
    });
  };

  handleSolve = actualBoard => {
    let solveBoard = sudoku.board_grid_to_string(actualBoard);
    solveBoard = sudoku.solve(solveBoard);
    if (solveBoard) {
      solveBoard = sudoku.board_string_to_grid(solveBoard);
      this.setState({
        board: solveBoard
      });
    } else return alert("You make some mistake, your sudoku can't be solved!");
  };

  handleCheck = actualBoard => {
    let checkBoard = sudoku.board_grid_to_string(actualBoard);
    checkBoard = sudoku.solve(checkBoard);
    if (checkBoard) return alert("Keep going you can solve it :)");
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
