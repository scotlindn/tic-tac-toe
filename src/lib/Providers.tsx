import { CssBaseline } from '@mui/material'

import { ThemeProvider } from './Providers/ThemeProviders'

export const Providers = ({ children }: { children: any }) => (
  <ThemeProvider>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    {children}
  </ThemeProvider>
)
