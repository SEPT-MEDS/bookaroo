import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  padding: 2em;
  display: flex;
  align-items: center;
  flex-direction: column;

  h1 {
    padding-bottom: .5em;
  }
`

export const TableContainer = styled.table`
  th {
    background-color: ${p => p.theme.backgroundSecondary}
  }
`

export const TableRow = styled.tr`
  td {
    align-items: center;
    padding: 1rem .5rem;
    border-bottom: 1px solid ${p => p.theme.greyText}55;
  }
`

export const UserLink = styled(Link)`
  text-decoration: none;
  color: ${p => p.theme.primary};
`

export const SymbolButton = styled.span`
  color: ${p=>p.theme.primary};
  display: flex;
  width: 100%;
  aspect-ratio: 1/1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
  font-size: 1.5rem;

  :hover {
    cursor: pointer;
    color: ${p => p.theme.text};
  }
`
