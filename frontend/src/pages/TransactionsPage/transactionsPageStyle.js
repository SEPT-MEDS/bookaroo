import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;

  a[href] {
    text-decoration: none;
    color: ${p => p.theme.primary};
  }
`

export const TransactionsContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 40em;
  gap: 1.5em;
  padding: 2em;
`

export const TransactionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  border: 2px solid ${p => p.theme.backgroundSecondary};
  border-radius: 1em;
  overflow: hidden;

  > div:not(:first-child) {
    padding: 1em;
    display: flex;
    flex-direction: column;
    gap: .2em;
    justify-content: space-around;

    div:not(:first-child) {
      padding-left: .4em;
    }

    div:first-child {
      padding-bottom: .5em;
      border-bottom: 1px solid ${p => p.theme.backgroundSecondary};
    }
  }
`