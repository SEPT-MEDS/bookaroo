import styled from 'styled-components'

export const NavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3em;
  width: 100%;
  font-size: 1rem;
  color: ${p => p.theme.invertedText};
  background: ${p => p.theme.primary};
  padding-left: .5em;
  padding-right: .5em;

  > a {
    text-decoration: none;
    color: inherit;
  }
`

export const NavItems = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  color: ${p => p.theme.invertedText};
  gap: 1em;
  font-weight: bold;
  font-size: 1.1rem;

  > a {
    color: inherit;
    text-decoration: none;
  }
`

