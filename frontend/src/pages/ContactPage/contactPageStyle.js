import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 2em;
  gap: 2em;

  > :first-child {
    border-right: 2px solid black;
  }
`

export const EmailForm = styled.form`
  display: grid;
  width: 100%;
  height: 100%;
  padding: 2em;
  padding-top: 0;
  padding-bottom: .5em;
  gap: .7em;
  grid-row: 1 / 3;
`

export const Field = styled.div`
  display: grid;
  gap: .1em;

  textarea {
    height: 7em;
  }

  textarea, input {
    padding: .4em;
    border-radius: .2rem;
    border: 1px solid black;
  }
`

export const FieldGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1em;
`

export const RequiredLabel = styled.label`
  ::after {
    display: inline-block;
    color: red;
    content: '*';
  }
`

export const ContactUs = styled.div`
  display: inline;
  float: right;
  width: 40%;
`

export const ContactInfoContainer = styled.div`
  grid-column: 2;
`

export const ContactPointsContainer = styled.div`
  grid-column: 2;
  grid-template-columns: 1fr;
  gap: .5em;
  height: max-content;
`
