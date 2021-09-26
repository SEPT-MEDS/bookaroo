import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  padding: 5em;

  section {
    margin-top: 2em;
    margin-left: 2em;

    > div {
      padding: 1em;
    }
  }
`

export const ListingContainer = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  column-gap: 1rem;
  border: 2px solid ${p => p.theme.backgroundSecondary};
  border-radius: .5rem;
  min-height: 15em;
  overflow: hidden;

  a {
    color: inherit;
  }

  > div:first-child {
    background-size: cover;
  }

  > div:not(:first-child) {
    padding: .5em;
  }
`
