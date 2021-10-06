import ManageUsersTable from 'components/Table/ManageUsersTable'
import React from 'react'
import { Container } from './manageUsersPageStyle'

const ManageUsersPage = () => {
  return <Container>
    <h1>Manage Users</h1>
    <ManageUsersTable />

  </Container>
}

export default ManageUsersPage
