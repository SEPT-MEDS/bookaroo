import styled from 'styled-components'

export const Container = styled.div`
  padding: 2em;
`

export const ListingInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 2em;
  min-height: 30em;

  .paypal-button {
    margin-top: 1rem;
    width: 265px;
  }

`

export const ActionBox = styled.div`
  margin-top: 2em;
`
