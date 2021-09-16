import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  row-gap: 5em;
  padding: 2em;
`

export const BookSellersContainer = styled.section`
width: 100%;
> div {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1em;
  padding: 1em;
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

export const BookInfoContainer = styled.section`
display: grid;
grid-template-columns: 1fr 2fr;
width: 100%;
min-height: 30em;
padding-right: 2em;
column-gap: 2em;

> div:first-child {
  display: grid;
  grid-template-rows: 1fr max-content;
}
`

export const BookInfoAuthor = styled.h3`
color: ${p => p.theme.greyText};
`

export const BookInfoDetails = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
column-gap: 2em;
`

export const BookInfoPara = styled.p`
background: ${p => p.theme.backgroundSecondary};
min-height: .5em;
width: 100%;
border-radius: .5rem;
margin-top: .5em;
margin-bottom: 2em;
padding: .5em;
`

