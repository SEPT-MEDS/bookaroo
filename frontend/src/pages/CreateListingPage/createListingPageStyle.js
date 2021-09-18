import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  padding-top: 7em;
`

export const Heading = styled.h2`
  text-align: center;
`

export const P = styled.p`
  max-width: 70vw;
`

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  margin-top: 1em;
  margin-bottom: 1em;
  padding-left: 1em;

  input {
    font-family: monospace;
  }
`

export const Form = styled.form`
  display: grid;
  gap: 1em;
  width: max-content;
  padding: 1em;

  border-radius: .5rem;

  input {
    padding: .4em;
    border-radius: .4rem;
    border: 1px solid #959595;
  }

  input[type=submit] {
    padding: .5em;
    box-shadow: 0px 3px 5px -1px #00000040;
    border: none;
    background: ${p => p.theme.primary};
    color: white;
    border-radius: .75rem;
    font-size: 1rem;
    font-weight: bold;

    &:hover {
      background: white;
      color: ${p => p.theme.primary};
      border: 2px solid ${p => p.theme.primary};
      cursor: pointer;
    }
  }
`
