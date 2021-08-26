import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  width: 100%;
  align-content: stretch;

  background: ${p => p.theme.backgroundSecondary};
  border-radius: .5rem;
  overflow: hidden;
  box-shadow: 0px 2px 4px 0px #808080e0;
`

export const Details = styled.div`
  display: grid;
  padding: .8em;
`

export const Author = styled.h3`
  color: ${p => p.theme.greyText};
  font-style: italic;
` 

export const Cover = styled.img`
  width: 100%;
  height: 25em;
`

export const RatingText = styled.span`
  color: ${p => p.theme.greyText};
`
