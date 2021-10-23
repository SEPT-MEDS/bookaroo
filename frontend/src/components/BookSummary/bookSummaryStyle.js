import styled from 'styled-components'

export const Author = styled.h3`
  color: ${p => p.theme.greyText};
`

export const Title = styled.h1`
  display: inline-block;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: .3em;
  color: ${p => p.theme.primary};

  >a[href] {
    text-decoration: none;
    color: inherit;
  }
`
