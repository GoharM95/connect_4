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

  verticalCheck(board, x, y) {
    const { currentTile } = this.state;

    // down
    for (let j = y - 3; j <= y; j++) {
      if (board[x][j] !== currentTile) {
        return false;
      }
    }
    return true;
  }

  horizontalCheck(board, x, y) {
    const { currentTile } = this.state;
    let firstIndex = x;
    let lastIndex = x;

    // left
    for (let i = x - 1; i >= 0; i--) {
      if (!board[i][y] || board[i][y] !== currentTile) {
        break;
      } else {
        firstIndex = i;
      }
    }

    // right
    for (let j = x + 1; j < board.length; j++) {
      if (!board[j][y] || board[j][y] !== currentTile) {
        break;
      } else {
        lastIndex = j;
      }
    }

    if (lastIndex - firstIndex === 3) {
      return true;
    }
    return false;
  }

  diagonalCheck1(board, x, y) {
    const { currentTile } = this.state;
    const colLength = 6;

    let firstIndex = x;
    let lastIndex = x;

    for (
      let i = x + 1, j = y + 1;
      i < board.length && j <= colLength;
      i++, j++
    ) {
      if (!board[i][j] || board[i][j] !== currentTile) {
        break;
      } else {
        lastIndex = i;
      }
    }

    for (let i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
      if (!board[i][j] || board[i][j] !== currentTile) {
        break;
      } else {
        firstIndex = i;
      }
    }

    if (Math.abs(lastIndex - firstIndex) === 3) {
      return true;
    }
    return false;
  }

  diagonalCheck2(board, x, y) {
    const { currentTile } = this.state;
    const colLength = 5;
    let firstIndex = x;
    let lastIndex = x;
    for (let i = x - 1, j = y + 1; i >= 0 && j <= colLength; i--, j++) {
      if (!board[i][j] || board[i][j] !== currentTile) {
        break;
      } else {
        firstIndex = i;
      }
    }
    for (let i = x + 1, j = y - 1; i < board.length && j >= 0; i++, j--) {
      if (!board[i][j] || board[i][j] !== currentTile) {
        break;
      } else {
        lastIndex = i;
      }
    }
    if (Math.abs(lastIndex - firstIndex) === 3) {
      return true;
    }
    return false;
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
