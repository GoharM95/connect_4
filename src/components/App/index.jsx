import React from "react";
import "./App.css";
import GridCell from "../GridCell";

class App extends React.Component {
  state = {
    currentTile: "red",
    board: [[], [], [], [], [], [], []],
  };

  sendTileDrop = (board, x, y) => {
    const colLength = 6;

    // check for the full column
    const tile = this.state.currentTile;
    if (board[x].length === colLength) {
      return;
    }

    const col = [...board[x], tile];
    const boardCopy = [...board];
    boardCopy[x] = col;
    this.setState({ board: boardCopy });
    this.setState({
      currentTile: this.state.currentTile === "red" ? "black" : "red",
    });

    this.checkGameStatus(boardCopy, x, y);
  };

  checkDirection(board, x, y, dirX, dirY) {
    const { currentTile } = this.state;
    const colLength = 6;
    const rowLength = 7;

    let firstIndexX = x;
    let firstIndexY = y;

    let lastIndexX = x;
    let lastIndexY = y;

    for (
      let i = x + dirX, j = y + dirY;
      i >= 0 && i < rowLength && j >= 0 && j < colLength;
      i += dirX, j += dirY
    ) {
      if (!board[i][j] || board[i][j] !== currentTile) {
        break;
      } else {
        firstIndexX = i;
        firstIndexY = j;
      }
    }

    for (
      let i = x - dirX, j = y - dirY;
      i >= 0 && i < rowLength && j >= 0 && j < colLength;
      i -= dirX, j -= dirY
    ) {
      if (!board[i][j] || board[i][j] !== currentTile) {
        break;
      } else {
        lastIndexX = i;
        lastIndexY = j;
      }
    }

    if (
      Math.abs(lastIndexX - firstIndexX) === 3 ||
      Math.abs(lastIndexY - firstIndexY) === 3
    ) {
      alert("we have a winner!");
      this.setState({
        currentTile: "red",
        board: [[], [], [], [], [], [], []],
      });
    }
  }

  verticalCheck(board, x, y) {
    this.checkDirection(board, x, y, 0, 1);
  }

  horizontalCheck(board, x, y) {
    this.checkDirection(board, x, y, 1, 0);
  }

  diagonalCheck1(board, x, y) {
    this.checkDirection(board, x, y, -1, 1);
  }

  diagonalCheck2(board, x, y) {
    this.checkDirection(board, x, y, 1, 1);
  }

  checkBoardForDraw = (board) => {
    const colLength = 6;
    for (let row of board) {
      if (row.length !== colLength) {
        return false;
      }
    }
    return true;
  };

  checkGameStatus(board, x, y) {
    if (
      this.verticalCheck(board, x, y) ||
      this.horizontalCheck(board, x, y) ||
      this.diagonalCheck1(board, x, y) ||
      this.diagonalCheck2(board, x, y)
    ) {
      alert("we have a winner!");
      this.setState({
        currentTile: "red",
        board: [[], [], [], [], [], [], []],
      });
    }

    // draw
    if (this.checkBoardForDraw(board)) {
      alert("it's a draw!");
    }
  }

  render() {
    const { board } = this.state;
    const boardElem = [];

    for (let y = 5; y >= 0; y--) {
      const row = [];
      for (let x = 0; x < 7; x++) {
        row.push(
          <GridCell
            sendTileDrop={this.sendTileDrop}
            board={board}
            key={x}
            x={x}
            y={y}
          />
        );
      }
      boardElem.push(
        <div key={y} className="row">
          {row}
        </div>
      );
    }
    return (
      <div className="App">
        <div>{boardElem}</div>
      </div>
    );
  }
}

export default App;
