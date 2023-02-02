import { useState } from 'react'

import { Slide, Snackbar, styled, Typography } from '@mui/material'

import { raleway } from '$lib/Providers/ThemeProviders'

import Game from './TicTacToe/Game'
import { Layout } from './TicTacToe/Layout'
import { Player } from './TicTacToe/types'
import { Welcome } from './TicTacToe/Welcome'

type GameStep = 'Welcome' | 'Game'

export const TicTacToe = () => {
  const [message, setMessage] = useState<string | null>(null)
  const [gameStep, setGameStep] = useState<GameStep>('Welcome')
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

  const matchHandler = (player: Player) => {
    setSelectedPlayer(player)
    setGameStep('Game')
    setMessage('NOW IN GAME')
  }

  const renderer = () => {
    switch (gameStep) {
      case 'Welcome':
        return <Welcome onMatch={matchHandler} />

      case 'Game':
        return selectedPlayer && <Game initialPlayer={selectedPlayer} />

      default:
        return <Welcome onMatch={matchHandler} />
    }
  }

  return (
    <Layout>
      {renderer()}
      <StyledSnackbar
        autoHideDuration={1000}
        open={!!message}
        ClickAwayListenerProps={{ mouseEvent: false }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setMessage(null)}
        TransitionComponent={(props) => <Slide {...props} direction="down" />}
      >
        <MessageBox style={raleway.style}>
          <MessageTitle>{message}</MessageTitle>
        </MessageBox>
      </StyledSnackbar>
    </Layout>
  )
}

const StyledSnackbar = styled(Snackbar)`
  top: 0 !important;
`

const MessageBox = styled('div')`
  background: #5cb85c;
  height: 40px;
  width: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MessageTitle = styled(Typography)`
  font-weight: 400;
  line-height: 19px;
  font-size: 16px;
  color: #ffffff;
`
