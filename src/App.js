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
  const newGame = {
    win: false,
    char: '',
    current: 'X',
    board: new Array(9).fill(' ')
  };
  const [game, setGame] = useState(newGame);

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

  const setBoard = n => {
    let t = [...game.board];
    t[n] = game.current;
    let { win, char } = checkBoard(t);
    setGame({
      win,
      char,
      current: game.current === 'X' ? 'O' : 'X',
      board: t
    });
  };

  const handleClick = e => {
    let n = e.target.getAttribute('i');
    if (!e.target.innerText) setBoard(n);
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
    setGame(newGame);
  };

  const Blank = <div className="tictactoe-blank" />;

  return (
    <div className="tictactoe-game">
      <div className="tictactoe-container" onClick={handleClick}>
        <Square val={game.board[0]} i={0} />
        {Blank}
        <Square val={game.board[1]} i={1} />
        {Blank}
        <Square val={game.board[2]} i={2} />
        {_.times(5, () => Blank)}
        <Square val={game.board[3]} i={3} />
        {Blank}
        <Square val={game.board[4]} i={4} />
        {Blank}
        <Square val={game.board[5]} i={5} />
        {_.times(5, () => Blank)}
        <Square val={game.board[6]} i={6} />
        {Blank}
        <Square val={game.board[7]} i={7} />
        {Blank}
        <Square val={game.board[8]} i={8} />
      </div>
      {game.win ? <Win char={game.char} reset={resetBoard} /> : ''}
    </div>
  );
};

const Square = ({ val, click, i }) => {
  return (
    <div className={'tictactoe-square' + (val === ' ' ? ' empty' : '')} i={i}>
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
