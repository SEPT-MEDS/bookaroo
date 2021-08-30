import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  row-gap: 5em;
  padding: 2em;
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

export const BookInfoCover = styled.div`
  width: 100%;
  height: 100%;
  background: ${p => p.theme.backgroundSecondary};
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

export const BookSellersContainer = styled.section`
  width: 100%;
`
