import React, { Component } from "react";
import "./App.scss";
import sudoku from "sudoku-umd";
import Header from "./Header/Header";
import Board from "./Board/Board";
import Button from "./Button/Button";
import TimeWatch from "./TimeWatch/TimeWatch";
import ScoreList from "./ScoreList/ScoreList";
import Paused from "./Paused/Paused";
import { getLevel } from "../helper";

let gameLevel = getLevel();
let data = sudoku.generate(gameLevel);
data = sudoku.board_string_to_grid(data);

let interval;

class App extends Component {
  state = {
    initialBoard: data,
    board: data,
    time: {
      seconds: 0,
      minutes: 0
    },
    finished: false,
    finishedTime: [],
    paused: false
  };

  handleTileChange = (e, id, rowIndex) => {
    if (e.target.value.length > 1) {
      return;
    }
    const inputValue = e.target.value ? e.target.value : ".";
    const updateBoard = [...this.state.board].map((square, i) => {
      if (i === rowIndex) {
        return (square = square.map((field, i) => {
          if (i === id) return (field = inputValue);
          else return field;
        }));
      } else return square;
    });
    this.setState({
      board: updateBoard
    });
  };

  handleRestart = () => {
    clearInterval(interval);
    this.stopWatch();
    this.setState({
      board: this.state.initialBoard,
      time: {
        seconds: 0,
        minutes: 0
      },
      finished: false,
      paused: false
    });
  };

  handleNewGame = () => {
    clearInterval(interval);
    this.stopWatch();

    gameLevel = getLevel();
    data = sudoku.generate(gameLevel);
    data = sudoku.board_string_to_grid([...data]);
    this.setState({
      initialBoard: data,
      board: data,
      time: {
        seconds: 0,
        minutes: 0
      },
      finished: false,
      paused: false
    });
  };

  handleSolve = initialBoard => {
    if (this.state.paused) return alert("To show solve, first unpause game :)");
    let solvedBoard = sudoku.board_grid_to_string(initialBoard);
    solvedBoard = sudoku.solve(solvedBoard);
    if (solvedBoard) {
      solvedBoard = sudoku.board_string_to_grid(solvedBoard);
      this.setState({
        board: solvedBoard,
        finished: true
      });
      clearInterval(interval);
    }
  };

  handleCheck = actualBoard => {
    if (this.state.paused)
      return alert("To check the board, first unpause game :)");
    let checkedBoard = sudoku.board_grid_to_string(actualBoard);
    checkedBoard = sudoku.solve(checkedBoard);
    if (checkedBoard) return alert("Keep going you can solve it :)");
    else return alert("You make some mistake, fix some Tiles");
  };

  getTime = () => {
    const { seconds, minutes } = this.state.time;
    if (seconds === 60) {
      this.setState(prevState => ({
        time: {
          ...prevState.time,
          minutes: minutes + 1,
          seconds: 0
        }
      }));
    } else {
      this.setState(prevState => ({
        time: {
          ...prevState.time,
          seconds: seconds + 1
        }
      }));
    }
  };

  stopWatch = () => {
    interval = setInterval(this.getTime, 1000);
  };

  handlePause = () => {
    if (interval) {
      clearInterval(interval);
      interval = 0;
      this.setState({
        paused: true
      });
    } else {
      this.stopWatch();
      this.setState({
        paused: false
      });
    }
  };

  componentDidMount() {
    this.stopWatch();
  }

  componentDidUpdate() {
    if (this.state.finished) {
      clearInterval(interval);
      return;
    } else {
      let finishedBoard = sudoku.board_grid_to_string(this.state.board);
      let result = finishedBoard.includes(".");
      if (!result) {
        finishedBoard = sudoku.solve(finishedBoard);
        if (finishedBoard) {
          alert(`Congratulations you solved ${gameLevel} level sudoku !!!`);
          const finishedTime = [this.state.time];
          this.setState(prevState => ({
            finished: true,
            finishedTime: [...prevState.finishedTime, ...finishedTime]
          }));
        } else {
          alert("Your sudoku was solved incorrect...");
          this.setState({
            finished: true
          });
        }
      }
    }
  }

  render() {
    return (
      <div className="container">
        <Header />
        {this.state.paused ? (
          <Paused />
        ) : (
          <Board
            change={this.handleTileChange}
            initialBoard={this.state.initialBoard}
            board={this.state.board}
          />
        )}
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
            board={this.state.initialBoard}
            name={"Solve"}
            click={this.handleSolve}
          />
          <Button
            class={"restart"}
            name={"Restart"}
            click={this.handleRestart}
          />
          <Button class={"pause"} name={"Pause"} click={this.handlePause} />
        </div>
        <TimeWatch time={this.state.time} gameLevel={gameLevel} />
        <ScoreList finishedTime={this.state.finishedTime} />
      </div>
    );
  }
}

export default App;
