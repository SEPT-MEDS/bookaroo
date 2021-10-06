import React from 'react'
import { TableRow, ButtonLink, UserLink } from './tableStyle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

const UserTableRow = ({ user }) => {
  return <TableRow>
    <td><UserLink to={`/user/${user.id}`}>{user.username}</UserLink></td>
    <td>{user.firstName}</td>
    <td>{user.lastName}</td>
    <td>{user.phoneNumber}</td>
    <td>{user.email}</td>
    <td>{user.address ? user.address : 'N/A'}</td>
    <td>{user.abn ? user.abn : 'N/A'}</td>
    <td>{user.type.charAt(0) + user.type.substring(1).toLowerCase()}</td>
    <td>{user.isEnabled ? 'Enabled' : 'Disabled'}</td>
    <td><ButtonLink to='#'><FontAwesomeIcon icon={faPenSquare} /></ButtonLink></td>
    <td><ButtonLink to='#'><FontAwesomeIcon icon={faTrash} /></ButtonLink></td>
  </TableRow>
}

export default UserTableRow