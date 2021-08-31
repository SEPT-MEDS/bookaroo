import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  gap: .5em;
  padding: 1em;
  width: 100%;
  color: ${p => p.theme.primary};
  background: ${p => p.theme.background};
  border-radius: .5rem;
  border: 2px solid currentColor;

  &.error {
    color: ${p => p.theme.error};
    background: ${p => p.theme.errorBackground};
  }

  a {
    color: inherit;
  }
`
