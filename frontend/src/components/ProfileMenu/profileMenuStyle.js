import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 1.2rem;
  gap: .3em;
  align-items: center;
  cursor: pointer;
  position: relative;
`

export const MenuBox = styled.div`
  position: absolute;
  top: 180%;
  right: -2%;
  background: ${p => p.theme.background};
  color: ${p => p.theme.text};
  width: 10em;
  padding: .5em;
  border: 2px solid grey;
  border-radius: .5rem;
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
