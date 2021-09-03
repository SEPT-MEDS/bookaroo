import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2em;
`

export const SearchBar = styled.input`
  padding: .5em;
  width: 40em;
  border-radius: .5rem;
  border: 2px solid ${p => p.theme.primary};

  &::placeholder {
    color: ${p => p.theme.greyText};
    font-style: italic;
  }
`
