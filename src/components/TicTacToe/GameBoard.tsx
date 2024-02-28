"use client";
import { useState } from "react";
import cx from "classnames";

type Move = "X" | "O" | "";

const GameBoard = () => {
  const cols = Array.from({ length: 9 }, (_, index) => index);
  const rows = [cols.slice(0, 3), cols.slice(3, 6), cols.slice(6)];
  const [winningRow, setWinningRow] = useState<number[]>([]);

  const initialMoves = rows.map((row) => row.map((_) => ""));
  const [currentMove, setCurrentMove] = useState<Move>("X");
  const [moves, setMoves] = useState<string[][]>(initialMoves);

  const handleClick = (rowIndex: number, colIndex: number) => {
    const updatedMoves: string[][] = [...moves];
    updatedMoves[rowIndex][colIndex] = currentMove;

    // Set the moves
    setMoves(updatedMoves);

    // Update the current move for the next player
    setCurrentMove((curr) => (curr === "X" ? "O" : "X"));

    const winner = getWinner(updatedMoves);

    if (winner?.player) {
      setWinningRow(winner?.line);
    }
  };

  const getWinner = (moves: string[][]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const allMoves = moves.flat();

    for (const lineIndex in lines) {
      const [a, b, c] = lines[lineIndex];

      if (allMoves[a] === allMoves[b] && allMoves[a] === allMoves[c]) {
        return {
          player: allMoves[a],
          line: lines[lineIndex],
        };
      }
    }

    return null;
  };

  const getRotation = () => {
    if (winningRow[0] === 2 && winningRow[1] === 4 && winningRow[2] === 6) {
      return "before:-rotate-45";
    } else if (
      winningRow[0] === 0 &&
      winningRow[1] === 4 &&
      winningRow[2] === 8
    ) {
      return "before:rotate-45";
    } else if (
      (winningRow[0] === 0 && winningRow[1] === 3 && winningRow[2] === 6) ||
      (winningRow[0] === 1 && winningRow[1] === 4 && winningRow[2] === 7) ||
      (winningRow[0] === 2 && winningRow[1] === 5 && winningRow[2] === 8)
    ) {
      return "before:rotate-90";
    }
    return "";
  };

  const handleRestart = () => {
    setCurrentMove("X");
    setMoves(initialMoves);
    setWinningRow([]);
  };

  const winner = getWinner(moves);

  return (
    <div className="grid grid-rows-3">
      {!winner?.player && (
        <div className="flex justify-center w-full">
          Current move: {currentMove}
        </div>
      )}

      {winner?.player && (
        <div className="flex justify-center w-full">
          Winner: {winner?.player}
        </div>
      )}

      {rows.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="grid grid-cols-3">
          {row.map((col, colIndex) => (
            <div
              key={`col-${colIndex}`}
              className={cx("h-20 w-20 border-2 relative")}
            >
              <button
                onClick={() => handleClick(rowIndex, colIndex)}
                className={cx(
                  "w-full h-full",
                  !moves[rowIndex]?.[colIndex] ? "hover:bg-gray-600" : "",
                  winningRow.includes(col)
                    ? "empty-content before:bg-white before:absolute before:h-0.5 before:left-0 before:top-1/2 before:bottom-1/2 before:inset-0"
                    : "",
                  getRotation()
                )}
                disabled={!!moves[rowIndex]?.[colIndex] || !!winningRow.length}
              >
                {moves[rowIndex]?.[colIndex]}
              </button>
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={() => handleRestart()}
        className="border-2 px-10 py-2 rounded-lg border-white mt-4"
      >
        Restart
      </button>
    </div>
  );
};

export default GameBoard;
