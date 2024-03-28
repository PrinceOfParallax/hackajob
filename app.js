import React, { useState } from 'react';
import './App.css';

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [nextPlayer, setNextPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) {
      return;
    }
    
    const newBoard = [...board];
    newBoard[index] = nextPlayer;
    setBoard(newBoard);
    
    checkWinner(newBoard);
    
    setNextPlayer(nextPlayer === 'X' ? 'O' : 'X');
  };

  const checkWinner = (board) => {
    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
    
    if (!board.includes(null)) {
      setWinner('Tie');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setNextPlayer('X');
    setWinner(null);
  };

  return (
    <div className="App">
      <div className="board">
        {board.map((cell, index) => (
          <div key={index} className="square" onClick={() => handleClick(index)}>
            {cell}
          </div>
        ))}
      </div>
      <div className="status">
        {!winner ? (board.includes(null) ? `Next player: ${nextPlayer}` : 'Tie') : (winner === 'Tie' ? 'Tie' : `Winner: ${winner}`)}
      </div>
      <button className="reset" onClick={resetGame}>Reset</button>
    </div>
  );
};

export default App;
