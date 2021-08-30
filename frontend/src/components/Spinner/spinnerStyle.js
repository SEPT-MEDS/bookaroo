import styled, { keyframes} from 'styled-components'

const spin = keyframes`
	from {
		transform: rotate(0);
	}
	to {
		transform: rotate(360deg);
	}
`

export const SpinnerGraphic = styled.div`
  font-size: .5rem;
  width: 10em;
  height: 10em;
  border-radius: 50%;
  box-shadow: inset 0px 0px 0px 10px ${p => p.theme.primary};
  position: relative;
  --inner-size: 70%;
  margin: auto;
  margin-top: 10em;
  animation: ${spin} 1s linear infinite;

  &::before {
    display: block;
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    top: 50%;
    left: 100%;
    -webkit-transform: translate(-100%,-50%);
    -ms-transform: translate(-100%,-50%);
    transform: translate(-100%,-50%);
    border: red solid 30px;
    border-color: transparent ${p => p.theme.background} transparent transparent;
  }
`
