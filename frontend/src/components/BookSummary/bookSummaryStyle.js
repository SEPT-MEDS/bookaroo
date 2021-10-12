import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Author = styled.h3`
  color: ${p => p.theme.greyText};
`

export const Title = styled(Link)`
  text-decoration: none;
  color: ${p => p.theme.primary};
  font-size: 1.5rem;
  font-weight: bold;
`
