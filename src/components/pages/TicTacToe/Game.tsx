import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Box, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import produce from 'immer'
import { isEqual, isNil } from 'lodash-es'

import { baskerville } from '$lib/Providers/ThemeProviders'
import { Button } from 'src/components/atom/Button'
import { useDebounce } from 'src/hooks/useDebounce'

import { Billboard } from './Game/Billboard'
import { getWinner } from './Game/getWinner'
import { pickRandomEmptyCell } from './Game/pickRandomEmptyCell'
import { Player } from './types'

const diagonalsPath = {
  LeftToRight: [
    [0, 0],
    [1, 1],
    [2, 2]
  ],
  RightToLeft: [
    [0, 2],
    [1, 1],
    [2, 0]
  ]
}

export type Diagonals = keyof typeof diagonalsPath

type BoardCell = Player | null
export type Board = [BoardCell, BoardCell, BoardCell][]
const initialBoardState: Board = new Array(3).fill(new Array(3).fill(null))

interface GameProps {
  initialPlayer?: Player
}
export const Game = (props: GameProps) => {
  const starter = props.initialPlayer ?? 'X'
  const [turn, setTurn] = useState<Player>(starter)
  const [board, setBoard] = useState<Board>(initialBoardState)
  const [lastWinner, setLastWinner] = useState<Player | null>(null)
  const winner = useMemo(() => getWinner(board), [board])

  const computerMove = useDebounce(
    () => {
      if (!winner?.player) {
        setBoard((prevBoard) =>
          produce(prevBoard, (draft) => {
            const [row, col] = pickRandomEmptyCell(draft)
            draft[row][col] = 'O'
          })
        )
        setTurn('X')
      }
    },
    [winner],
    { wait: 700 }
  )

  useEffect(() => () => computerMove.cancel(), [computerMove])

  const isGameFinished = useMemo(
    () => !!winner?.player || board.flat().every((b) => !isNil(b)),
    [board, winner]
  )

  const onBoardClickHandler = useCallback(
    (row: number, col: number) => {
      setBoard(
        produce(board, (draft) => {
          draft[row][col] = turn
        })
      )
      setTurn('O')

      if (!isGameFinished) computerMove()
    },
    [board, computerMove, isGameFinished, turn]
  )

  const playAgainHandler = useCallback(() => {
    setBoard(initialBoardState)
    setTurn(starter)
    setLastWinner(winner?.player ?? null)
  }, [starter, winner?.player])

  return (
    <Stack alignItems="center" justifyItems="center" sx={{ pt: '89px' }}>
      <Billboard turn={turn} winner={winner?.player} lastWinner={lastWinner} />
      <Box sx={{ mt: '49px' }}>
        {board.map((row, rowIndex) => (
          <Row key={rowIndex} $inWinnerPath={rowIndex === winner?.path.row}>
            {row.map((col, colIndex) => {
              let isCellInWinnerPath = false

              if (winner?.path.diagonal)
                isCellInWinnerPath = diagonalsPath[winner.path.diagonal].some(
                  (elementPosition) =>
                    isEqual(elementPosition, [rowIndex, colIndex])
                )

              if (winner?.path.column !== undefined && winner?.path.column > -1)
                isCellInWinnerPath = colIndex === winner?.path.column

              const isCellReadOnly = board[rowIndex][colIndex] !== null

              return (
                <CellButton
                  key={colIndex}
                  disabled={isGameFinished || turn === 'O'}
                  $readOnly={isCellReadOnly}
                  $inWinnerPath={isCellInWinnerPath}
                  onClick={() =>
                    !isGameFinished &&
                    !isCellReadOnly &&
                    onBoardClickHandler(rowIndex, colIndex)
                  }
                >
                  <CellTitle style={baskerville.style}>{col}</CellTitle>
                </CellButton>
              )
            })}
          </Row>
        ))}
      </Box>
      {isGameFinished && (
        <StyledButton onClick={playAgainHandler}>PLAY AGAIN</StyledButton>
      )}
    </Stack>
  )
}

const CellTitle = styled(Typography)`
  font-weight: 400;
  font-size: 48px;
  line-height: 55px;
`

const StyledButton = styled(Button)`
  height: 40px;
  width: 300px;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  margin-top: 60px;
`

interface RowProps {
  $inWinnerPath: boolean
}

const Row = styled('div')<RowProps>((props) => ({
  display: 'flex',
  '&:not(:last-child)': {
    borderBottom: '5px solid #7e7e7e'
  },
  background: props.$inWinnerPath ? '#5CB85C' : 'unset'
}))

interface ColumnButtonProps {
  $readOnly: boolean
  $inWinnerPath: boolean
}
const CellButton = styled('button')<ColumnButtonProps>`
  width: 10rem;
  height: 10rem;
  user-select: none;
  border: none;
  cursor: ${(props) =>
    props.disabled || props.$readOnly ? 'unset' : 'pointer'};
  background: ${(props) => (props.$inWinnerPath ? '#5CB85C' : 'unset')};
  display: flex;
  align-items: center;
  justify-content: center;
  &:not(:last-child) {
    border-right: 5px solid #7e7e7e;
  }
`

export default Game
