import styled from 'styled-components'

export const StyledButton = styled.button`
  padding: .5em;
  margin-top: .6em;
  margin-left: .3em;

  box-shadow: 0px 3px 5px -1px #00000040;
  border: none;
  background: ${p => p.theme.primary};
  font-size: 1rem;
  cursor: pointer;
  color: ${p => p.theme.invertedText};
  border-radius: .7em;
  border: 2px solid transparent;

  &:hover:not([disabled]) {
    background: ${p => p.theme.background};
    color: ${p => p.theme.primary};
    border: 2px solid ${p => p.theme.primary};
    cursor: pointer;
  }

  &[disabled] {
    background: ${p => p.theme.primary}44;
  }
`

