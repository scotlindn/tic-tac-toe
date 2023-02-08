import { useState } from 'react'

import { Divider, DividerProps, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { isNull } from 'lodash-es'

import { baskerville } from '$lib/Providers/ThemeProviders'
import { Button } from 'src/components/atom/Button'

import { Player } from './types'

const playersList: Player[] = ['X']

interface WelcomeProps {
  onMatch: (selectedUser: Player) => void
}
export const Welcome = (props: WelcomeProps) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

  return (
    <Stack
      alignItems="center"
      justifyContent="space-between"
      sx={{
        height: '100%',
        py: 5
      }}
    >
      <Typography sx={{ fontSize: '18px', lineHeight: '21px' }}>
        WELCOME
      </Typography>
      <Typography
        sx={{ fontWeight: 300, fontSize: '20px', lineHeight: '24px' }}
      >
        PICK YOUR PLAYER
      </Typography>
      <Stack direction="row" spacing="100px">
        {playersList.map((player) => (
          <Stack
            key={player}
            alignItems="center"
            onClick={() => setSelectedPlayer(player)}
          >
            <Player>{player}</Player>
            <PlayerUnderline $isSelected={selectedPlayer === player} />
          </Stack>
        ))}
      </Stack>
      <StartGameButton
        disabled={isNull(selectedPlayer)}
        onClick={() => selectedPlayer && props.onMatch(selectedPlayer)}
      >
        MATCH ME WITH MY OPPONENT
      </StartGameButton>
    </Stack>
  )
}

const Player = styled(Typography)`
  ${baskerville.style}
  font-size: 48px;
  line-height: 55px;
  cursor: pointer;
`

type PlayerUnderlineProps = DividerProps & { $isSelected: boolean }
const PlayerUnderline = styled(
  ({ $isSelected, ...props }: PlayerUnderlineProps) => <Divider {...props} />
)((props) => ({
  height: '5px',
  width: '60px',
  background: props.$isSelected ? '#5CB85C' : '#d8d8d8'
}))

const StartGameButton = styled(Button)`
  height: 40px;
  width: 300px;
  font-size: 16px;
  line-height: 19px;
`
