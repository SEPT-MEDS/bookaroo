import styled from 'styled-components'

export const Author = styled.h3`
  color: ${p => p.theme.greyText};
`

export const Title = styled.h1`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;

  &[href] {
    display: inline-block;
    color: ${p => p.theme.primary};
    margin-top: .3em;
  }
`
