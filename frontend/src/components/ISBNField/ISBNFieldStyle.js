import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  gap: 1em;
  align-items: center;
  padding-left: .5em;
  margin-top: 1em;
  margin-bottom: 1em;
`

export const StyledInput = styled.input`
  margin-right: .3em;
  margin-left: .3em;
  text-align: center;

  &.isbn-input-1 {
    width: 2em;
  }

  &.isbn-input-2 {
    width: 2.5em;
  }

  &.isbn-input-3 {
    width: 3em;
  }

  &.isbn-input-6 {
    width: 5em;
  }
`
