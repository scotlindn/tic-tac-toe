import { Board, Diagonals } from '../Game'
import { Player } from '../types'

interface WinnerPath {
  row: number
  column: number
  diagonal: null | Diagonals
}

export const getWinner = (board: Board) => {
  let path: WinnerPath = {
    row: -1,
    column: -1,
    diagonal: null
  }

  let player: Player | null = null

  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2] &&
      board[i][0] !== null
    ) {
      path.row = i
      player = board[i][0]
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i] &&
      board[0][i] !== null
    ) {
      path.column = i
      player = board[0][i]
    }
  }

  // Check diagonals
  if (
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2] &&
    board[0][0] !== null
  ) {
    path.diagonal = 'LeftToRight'
    player = board[0][0]
  }

  if (
    board[2][0] === board[1][1] &&
    board[1][1] === board[0][2] &&
    board[2][0] !== null
  ) {
    path.diagonal = 'RightToLeft'
    player = board[2][0]
  }

  // We Have a Winner ;)
  if (player) {
    return { player, path: path }
  }

  // NO Winner
  return null
}
