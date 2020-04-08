import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import './styles.css';

export default function App() {
  return (
    <div className="App">
      <TicTacToe />
    </div>
  );
}

const TicTacToe = () => {
  const [game, setGame] = useState({
    win: false,
    char: '',
    current: 'X',
    board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
  });

  useEffect(() => {
    function handleResize() {
      // fit game to fill viewport
      var [t1] = document.getElementsByClassName('tictactoe-game');
      var t2 = document.getElementsByClassName('tictactoe-square-text');
      var [t3] = document.getElementsByClassName('win-box');
      var t;
      var m = window.innerWidth > window.innerHeight ? 'vh' : 'vw';
      t1.style.height = t1.style.width = '95' + m;
      for (t of t2) t.style.fontSize = '25' + m;
      if (t3) {
        t3.style.fontSize = '28' + m;
        t3.style.lineHeight = '33' + m;
        t3.style.paddingTop = '16' + m;
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
  });

  const handleClick = n => {
    if (game.board[n] !== ' ') return; // move already made
    let t = [...game.board];
    t[n] = game.current;
    let { win, char } = checkBoard(t);
    setGame({
      win: win,
      char: char,
      current: game.current === 'X' ? 'O' : 'X',
      board: t
    });
  };

  const checkBoard = s => {
    for (let m of ['X', 'O']) {
      for (let i = 0; i < 3; i++) {
        if (s[i * 3] === m && s[i * 3 + 1] === m && s[i * 3 + 2] === m)
          return { win: true, char: m };
      }
      for (let i = 0; i < 3; i++) {
        if (s[i] === m && s[i + 3] === m && s[i + 6] === m)
          return { win: true, char: m };
      }
      if (s[0] === m && s[4] === m && s[8] === m) return { win: true, char: m };
      if (s[6] === m && s[4] === m && s[2] === m) return { win: true, char: m };
    }
    if (!s.includes(' ')) return { win: true, char: '😺' };
    return { win: false, char: '' };
  };

  const resetBoard = () => {
    setGame({
      win: false,
      char: '',
      current: 'X',
      board: '         '
    });
  };

  const Blank = <div className="tictactoe-blank" />;

  return (
    <div className="tictactoe-game">
      <div className="tictactoe-container">
        <Square val={game.board[0]} click={n => handleClick(0)} />
        {Blank}
        <Square val={game.board[1]} click={n => handleClick(1)} />
        {Blank}
        <Square val={game.board[2]} click={n => handleClick(2)} />
        {_.times(5, () => Blank)}
        <Square val={game.board[3]} click={n => handleClick(3)} />
        {Blank}
        <Square val={game.board[4]} click={n => handleClick(4)} />
        {Blank}
        <Square val={game.board[5]} click={n => handleClick(5)} />
        {_.times(5, () => Blank)}
        <Square val={game.board[6]} click={n => handleClick(6)} />
        {Blank}
        <Square val={game.board[7]} click={n => handleClick(7)} />
        {Blank}
        <Square val={game.board[8]} click={n => handleClick(8)} />
      </div>
      {game.win ? <Win char={game.char} reset={resetBoard} /> : ''}
    </div>
  );
};

const Square = ({ val, click }) => {
  return (
    <div className="tictactoe-square" onClick={click}>
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
