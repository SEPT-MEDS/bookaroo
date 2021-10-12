import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-top: 3em;
  gap: .5em;
`

export const Heading = styled.h1`
  font-size: 4rem;
  font-style: italic;
`

export const StyledLink = styled(Link)`
  color: inherit;
  margin-top: 1.5em;
`

export const Image = styled.img`
  margin-top: 2em;
  width: 30em;
  background: ${p => p.theme.backgroundSecondary};
  box-shadow: 0px 5px 8px 3px hsla(0deg, 0%, 0%, 50%);
  border-radius: .5em;
`
