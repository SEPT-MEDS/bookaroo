import styled from 'styled-components'

export const StyledButton = styled.button`
  padding: 1em;
  margin-top: .5em;

  background: ${p => p.theme.primary};
  color: ${p => p.theme.invertedText};
  border-radius: 1em;
  border: 2px solid transparent;
  cursor: pointer;

  &:hover {
    background: ${p => p.theme.background};
    color: ${p => p.theme.text};
    border: 2px solid ${p => p.theme.primary};
  }
`

