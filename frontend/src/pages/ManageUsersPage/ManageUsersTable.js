import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import { getAllUsers, setAccountStatus } from 'services'
import { useAsync } from 'hooks'

import { TableContainer, TableRow, SymbolButton, UserLink } from './manageUsersPageStyle'

const TABLE_HEADERS = [
  'Username',
  'First Name',
  'Last Name',
  'Phone Number',
  'Email',
  'ABN',
  'User Type',
  'Status',
  '',
  ''
]

const ManageUsersTable = () => {
  const [isValid, setIsValid] = useState(false)
  const { response: allUsers, isLoading } = useAsync(() => getAllUsers(), [ isValid ])

  console.log(allUsers)

  if (isLoading)
    return <TableContainer><em>Loading them users for u...</em></TableContainer>

  return <TableContainer>
    <thead>
      <tr>{TABLE_HEADERS.map((header, i) => <th key={i}>{header}</th>)}</tr>
    </thead>
    <tbody>
      {allUsers?.map(user =>
        <UserTableRow user={user} key={user.id} onUpdate={() => setIsValid(false) } />
      )}
    </tbody>
  </TableContainer>
}

const UserTableRow = ({ user, onUpdate }) => {
  const handleUpdateStatus = newStatus => async () => {
    await setAccountStatus(user.id, newStatus)
    onUpdate()
  }

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
    <td>
      <SymbolButton onClick={handleUpdateStatus(true)}>
        <FontAwesomeIcon icon={faCheck} />
      </SymbolButton>
    </td>
    <td>
      <SymbolButton onClick={handleUpdateStatus(false)}>
        <FontAwesomeIcon icon={faTimes} />
      </SymbolButton>
    </td>
  </TableRow>
}

export default ManageUsersTable
