import { Board } from '../Game'

export const pickRandomEmptyCell = (board: Board): [number, number] => {
  const emptyCells = []

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === null) {
        emptyCells.push([i, j])
      }
    }
  }

  const randomIndex = Math.floor(Math.random() * emptyCells.length)

  return emptyCells[randomIndex] as [number, number]
}
