import styled from 'styled-components'

export const ReviewSection = styled.div`
   a {
      color: ${p => p.theme.primary};
      text-decoration: inherit;
   }
`

export const ReviewInputForm = styled.form`
   // Position inputs nicely
   margin-top: 1rem;
   margin-bottom: 2rem;

   // Slightly round inputs and set border properties
   input[type=text], input[type=number] {
      padding: .4em;
      border-radius: .4rem;
      border: 1px solid #959595;
   }
   
   // Make text field full width
   input[type=text] {
      margin-bottom: .25rem;
      width: 100%;
   }

   input[type=number] {
      width: 5rem;
      margin-right: 1rem;
   }

   // Button to follow style of the site
   input[type=submit] {
      float:right;
      padding: .5em;
      box-shadow: 0px 3px 5px -1px #00000040;
      border: none;
      background: ${p => p.theme.primary};
      color: white;
      border-radius: .75rem;
      font-size: 1rem;
      font-weight: bold;
      background: ${p => p.theme.primary};

      &:hover {
         background: white;
         color: ${p => p.theme.primary};
         // Using box shadow to put the outline inside the box rather than outside
         // Using border causes the shape of the button to shift slightly to the bottom left
         box-shadow: inset 0px 0px 0px 2px ${p => p.theme.primary};
         cursor: pointer;
      }
   }

`

export const ReviewBlock = styled.div`
   // Set border properties
   border: 1px solid ${p => p.theme.greyText}55;
   padding: 1rem 2rem;
   // not sure of the best unit for this
   border-radius: 40px;
   margin-bottom: 1rem;
`