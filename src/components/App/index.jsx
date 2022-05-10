import React from "react";
import "./App.css";
import GridCell from "../GridCell";

class App extends React.Component {
  state = { currentTile: "red", board: [[], [], [], [], [], [], []] };

  sendTileDrop = (board, x, y) => {
    const tile = this.state.currentTile;

    const col = [...board[x], tile];
    const boardCopy = board.slice();
    boardCopy[x] = col;
    this.setState({ board: boardCopy });
    this.setState({
      currentTile: this.state.currentTile === "red" ? "black" : "red",
    });

    this.getWinner(boardCopy, x, y);
  };

  verticalCheck(board, x, y) {
    const { currentTile } = this.state;

    // down
    for (let j = y - 3; j <= y; j++) {
      if (board[x][j] !== currentTile) {
        return;
      }
    }

    alert("we have a winner!");
    this.setState({ currentTile: "red", board: [[], [], [], [], [], [], []] });
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
      alert("we have a winner!");
      this.setState({
        currentTile: "red",
        board: [[], [], [], [], [], [], []],
      });
    }
  }

  diagonalCheck1(board, x, y) {
    const { currentTile } = this.state;
    const colLength = 5;

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
      alert("we have a winner!");
      this.setState({
        currentTile: "red",
        board: [[], [], [], [], [], [], []],
      });
    }
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
      alert("we have a winner!");
      this.setState({
        currentTile: "red",
        board: [[], [], [], [], [], [], []],
      });
    }
  }

  getWinner(board, x, y) {
    this.verticalCheck(board, x, y);
    this.horizontalCheck(board, x, y);
    this.diagonalCheck1(board, x, y);
    this.diagonalCheck2(board, x, y);
  }

  render() {
    const { board } = this.state;
    const cells = [];

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
      cells.push(
        <div key={y} className="row">
          {row}
        </div>
      );
    }
    return (
      <div className="App">
        <div>{cells}</div>
      </div>
    );
  }
}

export default App;
