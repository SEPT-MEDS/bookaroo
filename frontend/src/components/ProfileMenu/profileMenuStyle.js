import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 1.2rem;
  gap: .3em;
  align-items: center;
  cursor: pointer;
  position: relative;
  user-select: none;
`

export const MenuBox = styled.div`
  display: grid;
  gap: .6em;

  position: absolute;
  top: 180%;
  right: -2%;
  background: ${p => p.theme.background};
  color: ${p => p.theme.text};
  width: 10em;
  padding: .8em;
  border: 2px solid ${p => p.theme.primary};
  border-radius: 1.5rem;
  border-top-right-radius: 0;
  box-shadow: 0px 1px 4px #4d4d4dad;

  /* Animations */
  transition: opacity .1s;

  &.closed {
    opacity: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`

export const SiteInfoContainer = styled.div`
  width: 100%;
  font-size: .8rem;
  display: flex;
  justify-content: space-around;
  align-content: center;
  color: ${p => p.theme.greyText};
  margin-top: .5em;
`

export const LogoutButton = styled.a`
  width: 100%;
  background: ${p => p.theme.primary};
  color: ${p => p.theme.invertedText} !important;
  padding: .2em;
  border-radius: 1em;
  text-align: center;
  margin-top: 1em;
`

export const Icon = styled.div`
  width: 1.25em;
  height: 1.2em;
  border-radius: 100%;
  background: #bfbfbf;
  position: relative;
  overflow: hidden;

  &:before {
    width: 50%;
    height: 52%;
    border-radius: 50%;
    background: white;
    display: block;
    content: '';
    position: absolute;
    left: 25%;
    top: 8.75%;
  }

  &:after {
    width: 40%;
    height: 70%;
    content: '';
    display: block;
    background: white;
    position: absolute;
    border-radius: 50%;
    left: 30%;
    top: 68%;
  }
`
