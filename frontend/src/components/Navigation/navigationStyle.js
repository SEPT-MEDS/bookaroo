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
`

export const Logo = styled.img``

