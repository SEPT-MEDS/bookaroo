import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'

import styles from './styles'
import Pages from './pages'
import { useIsDarkScheme } from './hooks'

const Main = styled.main`
  background: ${p => p.theme.background};
  color: ${p => p.theme.text};
`

const App = () => {
  const isDarkTheme = useIsDarkScheme()

  return (
    <>
      <Router>
        <ThemeProvider
          theme={{ ...styles, ...styles[isDarkTheme ? 'dark' : 'light'] }}
        >
          <Main>
            <Pages />
          </Main>
        </ThemeProvider>
      </Router>
    </>
  )
}

export default App
