import styled, {keyframes} from 'styled-components'
import { Link } from 'react-router-dom'

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

export const UserLink = styled(Link)`
  color: ${p => p.theme.primary};
  text-decoration: none;
`

export const RatingContainer = styled.div`
  font-size: 1.3rem;
`

export const PurchaseButtonContainer = styled.div`
  margin-top: .5rem;
  max-width: 14rem;
`

export const ActionBox = styled.div`
  margin-top: 2em;
`

const spin = keyframes`
	from {
		transform: rotate(0);
	}
	to {
		transform: rotate(360deg);
	}
`

export const PurchaseSuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  gap: 2em;

  > :first-child {
    font-size: 7rem;
    color: ${p => p.theme.primary};
    animation: ${spin} 1s cubic-bezier(.5, .5, .2, 1) infinite;
    animation-delay: 30s;
  }

  a {
    color: ${p => p.theme.primary};
    text-decoration: none;
  }

  marquee {
    margin-top: 2em;
    font-size: 2rem;
    font-weight: bold;
    width: 70%;
    margin: auto;
    transform: perspective(10px) rotateX(2deg);
    color: ${p => p.theme.invertedText};
    background: ${p => p.theme.primary};
    padding: .2rem;
    font-family: impact;
  }
`
