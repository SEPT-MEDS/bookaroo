import styled from 'styled-components'

export const ListingContainer = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  column-gap: 1rem;
  border: 2px solid ${p => p.theme.backgroundSecondary};
  border-radius: .5rem;
  min-height: 15em;
  overflow: hidden;
  position: relative;


  a {
    color: ${p => p.theme.primary};
    text-decoration: inherit;
  }

  > div:first-child {
    background-size: cover;
  }

  > div:not(:first-child) {
    padding: .5em;
  }

`

export const DeleteButtonContainer = styled.div`
  position: absolute;
  right: 1.5%;
  bottom: 2%;
  font-size: 1.35rem;
`

export const DeleteButton = styled.div`
  color: ${p => p.theme.primary};

  :hover {
    cursor: pointer;
    color: ${p => p.theme.text};
  }
`