import React, { useState, useEffect } from 'react'
import { TableContainer } from './tableStyle'
import { TableRow, ButtonLink, UserLink } from './tableStyle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { getAllUsers, setAccountStatus } from 'services'

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

    <td>
      <ButtonLink to='#'><FontAwesomeIcon icon={faCheck} onClick={() => {
        setAccountStatus(user.id, true)
      }} />
      </ButtonLink>
    </td>

    <td>
      <ButtonLink to='#'><FontAwesomeIcon icon={faTimes} onClick={() => {
        setAccountStatus(user.id, false)
      }} />
      </ButtonLink>
    </td>
  </TableRow>
}

const ManageUsersTable = () => {
  const [allUsers, setAllUsers] = useState()
  const [error, setError] = useState()
  const [isValid, setIsValid] = useState(false)

  // Fetch all users
  useEffect(() => {
    const fetchAllUsers = async () => {
      // Wait for results and update state

      try {
        const request = getAllUsers()
        setAllUsers(await request)
      } catch (err) {
        console.log(err)
        setError(err?.message)
      }
    }

    fetchAllUsers()
  }, [isValid])

  if (error) {
    console.log(error)
  }

  return <TableContainer>
    <thead>
      <tr>
        <th>Username</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Phone Number</th>
        <th>Email</th>
        <th>Address</th>
        <th>ABN</th>
        <th>User Type</th>
        <th>Status</th>
        {/* <th></th>
        <th></th>
        <th></th>
        <th></th> */}
      </tr>
    </thead>
    <tbody>
      {allUsers?.users.map(user => <UserTableRow user={user} key={user.id} onUpdate={() => setIsValid(false) }/>)}
    </tbody>
  </TableContainer>
}

export default ManageUsersTable