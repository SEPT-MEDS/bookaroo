import styled from 'styled-components'

export const CardContainer = styled.a`
  display: grid;
  width: 100%;
  max-width: 300px;
  align-content: stretch;

  text-decoration: none;
  background: ${p => p.theme.backgroundSecondary};
  border-radius: .5rem;
  overflow: hidden;
  box-shadow: 0px 2px 4px 0px hsla(0deg 0% 0% / 50%);
  color: ${p => p.theme.text};
`

export const Details = styled.div`
  display: grid;
  padding: .8em;
`

export const Author = styled.h3`
  color: ${p => p.theme.greyText};
  font-style: italic;
` 
