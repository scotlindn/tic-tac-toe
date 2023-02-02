import { Typography } from '@mui/material'

import { Player } from '../types'

interface BillboardProps {
  winner?: Player | null
  turn?: Player | null
  lastWinner?: Player | null
}

export const Billboard = (props: BillboardProps) => (
  <Typography
    sx={{
      color: '#201238',
      fontWeight: '300',
      fontSize: '20px',
      lineHeight: '24px'
    }}
  >
    {props.winner
      ? `${props.winner} WINS${
          props.lastWinner === props.winner ? ' AGAIN!' : '!'
        }`
      : `${props.turn}'S TURN! ${props.turn === 'O' ? 'Thinking ;)' : ''}`}
  </Typography>
)
