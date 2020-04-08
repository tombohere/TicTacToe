import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <TicTacToe />
    </div>
  );
}

const TicTacToe = () => {
  const [win, setWin] = useState({ win: false, char: "" });
  const [current, setCurrent] = useState("X");
  const [board, setBoard] = useState("         ");

  useEffect(() => {
    function handleResize() {
      // fit game to fill viewport
      var t1 = document.getElementsByClassName("tictactoe-game");
      var t2 = document.getElementsByClassName("tictactoe-square-text");
      var t3 = document.getElementsByClassName("win-box");
      var width = window.innerWidth;
      var height = window.innerHeight;
      var t;
      if (width > height) {
        t1[0].style.height = "90vh";
        t1[0].style.width = "90vh";
        for (t of t2) t.style.fontSize = "25vh";
        t2[0].style.fontSize = "25vh";
        if (t3.length) {
          t3[0].style.fontSize = "28vh";
          t3[0].style.lineHeight = "32vh";
          t3[0].style.paddingTop = "16vh";
        }
      } else {
        t1[0].style.height = "90vw";
        t1[0].style.width = "90vw";
        for (t of t2) t.style.fontSize = "25vw";
        if (t3.length) {
          t3[0].style.fontSize = "28vw";
          t3[0].style.lineHeight = "32vw";
          t3[0].style.paddingTop = "16vw";
        }
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
  });

  const handleClick = n => {
    if (board[n] !== " ") return; // move already made
    let t = [...board];
    t[n] = current;
    t = t.join("");
    setCurrent(current === "X" ? "O" : "X");
    setBoard(t);
    setTimeout(() => checkBoard(t), 100);
  };

  const checkBoard = s => {
    for (let m of ["X", "O"]) {
      for (let i = 0; i < 3; i++) {
        if (s[i * 3] === m && s[i * 3 + 1] === m && s[i * 3 + 2] === m)
          setWin({ win: true, char: m });
      }
      for (let i = 0; i < 3; i++) {
        if (s[i] === m && s[i + 3] === m && s[i + 6] === m)
          setWin({ win: true, char: m });
      }
      if (s[0] === m && s[4] === m && s[8] === m)
        setWin({ win: true, char: m });
      if (s[6] === m && s[4] === m && s[2] === m)
        setWin({ win: true, char: m });
    }
    if (!s.includes(" ")) setWin({ win: true, char: "😺" });
  };

  const resetBoard = () => {
    setWin({ win: false, char: "" });
    setCurrent("X");
    setBoard("         ");
  };

  return (
    <div className="tictactoe-game">
      <div className="tictactoe-container">
        <Square val={board[0]} onClick={n => handleClick(0)} />
        <div className="tictactoe-blank" />
        <Square val={board[1]} onClick={n => handleClick(1)} />
        <div className="tictactoe-blank" />
        <Square val={board[2]} onClick={n => handleClick(2)} />

        <div className="tictactoe-blank" />
        <div className="tictactoe-blank" />
        <div className="tictactoe-blank" />
        <div className="tictactoe-blank" />
        <div className="tictactoe-blank" />

        <Square val={board[3]} onClick={n => handleClick(3)} />
        <div className="tictactoe-blank" />
        <Square val={board[4]} onClick={n => handleClick(4)} />
        <div className="tictactoe-blank" />
        <Square val={board[5]} onClick={n => handleClick(5)} />

        <div className="tictactoe-blank" />
        <div className="tictactoe-blank" />
        <div className="tictactoe-blank" />
        <div className="tictactoe-blank" />
        <div className="tictactoe-blank" />

        <Square val={board[6]} onClick={n => handleClick(6)} />
        <div className="tictactoe-blank" />
        <Square val={board[7]} onClick={n => handleClick(7)} />
        <div className="tictactoe-blank" />
        <Square val={board[8]} onClick={n => handleClick(8)} />
      </div>
      {win.win ? <Win char={win.char} reset={resetBoard} /> : ""}
    </div>
  );
};

const Square = ({ val, onClick }) => {
  return (
    <div className="tictactoe-square" onClick={onClick}>
      <div className="tictactoe-square-text">{val}</div>
    </div>
  );
};

const Win = ({ char, reset }) => {
  return (
    <div className="win-box" onClick={reset}>
      {char}
      <br />
      WINS
    </div>
  );
};