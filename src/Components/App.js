import React, { Component } from "react";
import "./App.scss";
import sudoku from "sudoku-umd";
import Header from "./Header/Header";
import Board from "./Board/Board";
import Button from "./Button/Button";
import TimeWatch from "./TimeWatch/TimeWatch";

let data = sudoku.generate("medium");
data = sudoku.board_string_to_grid(data);

class App extends Component {
  state = {
    initialBoard: data,
    board: data,
    time: {
      seconds: 0,
      minutes: 0
    }
  };

  handleTileChange = (e, id, rowIndex) => {
    const updateBoard = [...this.state.board].map((square, i) => {
      if (i === rowIndex) {
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
      board: this.state.initialBoard,
      time: {
        seconds: 0,
        minutes: 0
      }
    });
  };

  handleNewGame = () => {
    data = sudoku.generate("medium");
    data = sudoku.board_string_to_grid([...data]);
    this.setState({
      initialBoard: data,
      board: data,
      time: {
        seconds: 0,
        minutes: 0
      }
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

  getTime = () => {
    const { seconds } = this.state.time;
    this.setState(prevState => ({
      time: { ...prevState.time, seconds: seconds + 1 }
    }));
  };

  componentDidMount() {
    this.stopWatch();
  }

  componentDidUpdate() {
    if (this.state.time.seconds === 60) {
      this.setState(prevState => ({
        time: {
          ...prevState.time,
          minutes: prevState.time.minutes + 1,
          seconds: 0
        }
      }));
    }
  }

  stopWatch = () => {
    setInterval(this.getTime, 1000);
  };

  render() {
    return (
      <div className="container">
        <Header />
        <Board
          change={this.handleTileChange}
          initialBoard={this.state.initialBoard}
          board={this.state.board}
        />
        <div className="buttons__wrapper">
          <Button
            class={"check"}
            board={this.state.board}
            name={"Check"}
            click={this.handleCheck}
          />
          <Button class={"game"} name={"New Game"} click={this.handleNewGame} />
          <Button
            class={"solve"}
            board={this.state.board}
            name={"Solve"}
            click={this.handleSolve}
          />
          <Button
            class={"restart"}
            name={"Restart"}
            click={this.handleRestart}
          />
        </div>
        <TimeWatch time={this.state.time} />
      </div>
    );
  }
}

export default App;
