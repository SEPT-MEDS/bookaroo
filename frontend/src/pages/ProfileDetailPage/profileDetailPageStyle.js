import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  padding: 5em;

  section {
    margin-top: 2em;
    margin-left: 2em;

    .listings {
      padding: 1em;
    }
  }
`

export const RatingContainer = styled.div`
  font-size: 1.3rem;
  margin-top: .5rem;
`

export const ListingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
`
