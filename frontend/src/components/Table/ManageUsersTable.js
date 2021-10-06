import React, { useState, useEffect } from 'react'
import { getAllUsers } from 'services'
import UserTableRow from './TableRow'
import { TableContainer } from './tableStyle'

const ManageUsersTable = () => {
  const [allUsers, setAllUsers] = useState()
  const [error, setError] = useState()

  // Fetch all users
  useEffect(() => {
    const fetchAllUsers = (async () => {
      // Wait for results and update state
      try {
        const request = getAllUsers()
        setAllUsers(await request)
      } catch (err) {
        console.log(err)
        setError(err?.message)
      }
    })

    fetchAllUsers()
  }, [])

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
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {allUsers?.users.map(user => <UserTableRow user={user} key={user.id}/>)}
    </tbody>
  </TableContainer>
}

export default ManageUsersTable