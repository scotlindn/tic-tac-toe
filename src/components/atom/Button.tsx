import { styled } from '@mui/system'

import { raleway } from '$lib/Providers/ThemeProviders'

export const Button = styled('button')`
  ${raleway.style}
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'unset' : 'pointer')};
  background: #201238;
  &:hover {
    background: rgba(40, 45, 79, 0.66);
  }
  text-transform: uppercase;
  color: #ffffff;
`
