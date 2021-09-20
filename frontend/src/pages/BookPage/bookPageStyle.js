import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2em;
`

export const ControlsContainer = styled.div`
  display: flex;
  gap: 1em;
  height: 2em;
`

export const CatSelectContainer = styled.div`
  display: flex;
  gap: .5em;
  height: 100%;
  align-items: center;

  select {
    height: 100%;
    border-radius: .5rem;
    border: 2px solid ${p => p.theme.primary};
  }
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
