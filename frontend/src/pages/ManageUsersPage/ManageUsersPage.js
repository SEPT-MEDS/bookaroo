import React from 'react'

import { Container } from './manageUsersPageStyle'
import ManageUsersTable from './ManageUsersTable'

const ManageUsersPage = () => {
  return <Container>
    <h1>Manage Users</h1>
    <ManageUsersTable />

  </Container>
}

export default ManageUsersPage
