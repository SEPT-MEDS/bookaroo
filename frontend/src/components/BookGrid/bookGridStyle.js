import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
  justify-items: center;
  padding: 2em;
  gap: 1em;
  row-gap: 2em;
  font-size: .8rem;
  width: 100%;
`
