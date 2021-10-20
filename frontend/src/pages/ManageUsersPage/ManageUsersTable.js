import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { deleteUser, getAllUsers, setAccountStatus } from 'services'
import { useAsync } from 'hooks'

import { TableContainer, TableRow, SymbolButton, UserLink } from './manageUsersPageStyle'

// Define headers of the manage users table
const TABLE_HEADERS = [
  'Username',
  'First Name',
  'Last Name',
  'Phone Number',
  'Email',
  'Address',
  'ABN',
  'User Type',
  'Status',
  '',
  '',
  ''
]

const ManageUsersTable = () => {
  const { response: allUsers, invalidate } = useAsync(() => getAllUsers())

  return <TableContainer>
    {/* Map each of the headers in the table */}
    <thead>
      <tr>{TABLE_HEADERS.map((header, i) => <th key={i}>{header}</th>)}</tr>
    </thead>
    {/* Map each user into the table */}
    <tbody>
      {allUsers?.map(user =>
        <UserTableRow user={user} key={user.id} onUpdate={() => invalidate() } />
      )}
    </tbody>
  </TableContainer>
}

// Single row within the table
const UserTableRow = ({ user, onUpdate }) => {
  const handleUpdateStatus = newStatus => async () => {
    // Confirm with user that they would like to enable/disable the user
    const CONFIRMATION_MESSAGE = newStatus
      ? 'Are you sure you would like to enable ' + user.username + '?'
      : 'Are you sure you would like to disable ' + user.username + '?'
    if (confirm(CONFIRMATION_MESSAGE)) {
      // Set the user to the new status and re-render table
      await setAccountStatus(user.id, newStatus)
      onUpdate()
    }
  }

  const handleDelete = () => async () => {
    if (confirm('Are you sure you would like to delete ' + user.username + '? THIS ACTION CANNOT BE REVERSED!')) {
      await deleteUser(user.id)
      onUpdate()
    }
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
    <td>
      <SymbolButton onClick={handleDelete()}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </SymbolButton>
    </td>
  </TableRow>
}

export default ManageUsersTable
