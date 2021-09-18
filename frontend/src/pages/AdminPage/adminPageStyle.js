import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Heading = styled.h1`
   /* text-align:center; */
   /* margin-top: 3rem; */
`

export const Container = styled.div`
   padding-top: 3em;
   display: flex;
   align-items: center;
   flex-direction: column;
`

export const AdminLink = styled(Link)`
   display: flex;
   width: 100%;
   aspect-ratio: 1/1;
   flex-direction: column;
   align-items: center;
   padding: 1.5em;
   justify-content: center;
   gap: 1em;

   border: 2px solid ${p => p.theme.greyText}55;
   border-radius: 1em;
   color: inherit;
   text-decoration: none;
   font-size: 1.5rem;

   :hover {
      background-color: ${p=>p.theme.backgroundSecondary};
   }
   
   *:first-child {
      font-size: 6rem;
   }

   `

export const AdminLinkContainer = styled.div`
   display:grid;
   width: 65%;
   max-width: 40em;
   min-width: 35em;
   grid-template-columns: 1fr 1fr;
   grid-template-rows: 1fr 1fr;
   grid-gap: 1.5em;
   padding: 1em;

   // Change 2x2 grid to list at a small width
   @media only screen and (max-width: 600px) {
      min-width: 18em;
      grid-template-columns: 1fr;
      width: 50%;
   }
   `