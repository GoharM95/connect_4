import React from "react";
import "./GridCell.css";

class GridCell extends React.Component {
  render() {
    const { board, x, y, sendTileDrop } = this.props;
    let classes = "cell";

    if (board[x][y] !== undefined) {
      if (board[x][y] === "red") {
        classes += " p2";
      } else {
        classes += " p1";
      }
    }

    return (
      <div
        className={classes}
        onClick={() => {
          sendTileDrop(board, x, board[x].length);
        }}
      >
        <p>
          {this.props.x}, {this.props.y}
        </p>
      </div>
    );
  }
}

export default GridCell;
