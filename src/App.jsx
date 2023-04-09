import { useState } from 'react'
import './App.scss'
import Square from './components/Square/Square.jsx'

const TURNS = {
  X: 'x',
  O: 'o'
}

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [boardMessage, setboardMessage] = useState(null)

  const checkWinner = (newBoard) => {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      const [a, b, c] = WINNING_COMBINATIONS[i]

      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a]
      }
    }

    return null
  }

  const updateBoard = (index) => {
    if (board[index]) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    setTurn(turn === TURNS.X ? TURNS.O : TURNS.X)

    const winner = checkWinner(newBoard)

    if (winner) {
      setboardMessage(`Winner is: ${winner}`)
    }

    if (!newBoard.includes(null)) {
      setboardMessage('Draw')
    }
  }

  const resetBoard = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setboardMessage(null)
  }

  return (
    <main className='board'>
      <h1 className='board__title'>Tic Tac Toe</h1>

      {boardMessage && (
        <div className='board__winner'>
          <span>{boardMessage}</span>
        </div>
      )}

      <div className='board__game'>
        {board.map((square, index) => (
          <Square key={index} index={index} updateBoard={updateBoard}>
            {board[index]}
          </Square>
        ))}
      </div>

      {boardMessage && (
        <button className='board__reset' onClick={resetBoard}>
          Reset game
        </button>
      )}

      <div className='board__turn'>
        <p>
          Current turn: <span>{turn}</span>
        </p>
      </div>
    </main>
  )
}

export default App
