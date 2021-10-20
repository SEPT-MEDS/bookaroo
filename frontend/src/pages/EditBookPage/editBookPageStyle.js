import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  padding-top: 2em;
  min-height: max-content;
`

export const Columns = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 3fr;
  gap: 2em;
  width: 70vw;
`

export const InputsContainer = styled.div`
  display: grid;
  gap: 1.5em;
  width: 100%;
`

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: .2em;

  textarea {
    height: 6em;
  }
`

export const Heading = styled.h2`
  text-align: center;
`

export const Form = styled.form`
  display: grid;
  gap: 1em;
  width: max-content;
  padding: 1em;

  border-radius: .5rem;

  textarea {
    resize: none;
  }

  input, textarea {
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

