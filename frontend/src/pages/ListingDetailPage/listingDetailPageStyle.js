import styled from 'styled-components'

export const Container = styled.div`
  padding: 2em;
`

export const ListingInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 2em;
  min-height: 30em;

  .reviews {
    margin: auto;
    grid-column: span 2;
    width: clamp(70vw, 20em, 250em);
    margin-top: 5em;
  }
`

export const ActionBox = styled.div`
  margin-top: 2em;
`
