import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  padding-top: 7em;
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

export const FieldsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 1em;
  border-radius: .5rem;
  box-shadow: 0px 3px 5px -1px #00000096;
  min-width: 20em;

  background: ${p => p.theme.backgroundSecondary};
`

export const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: 1em;
  gap: .2em;

  label {
    margin-left: .5em;
  }
`

export const Heading = styled.h2`
  text-align: center;
`

export const ErrorNotification = styled.div`
  padding: 1em;
  width: 100%;
  color: ${p => p.theme.error};
  background: ${p => p.theme.errorBackground};
  border-radius: .5rem;
  border: 2px solid red;
`
