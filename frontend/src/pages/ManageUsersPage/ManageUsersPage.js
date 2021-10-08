import { useCurrentProfile } from 'hooks'
import React from 'react'

import { Container } from './manageUsersPageStyle'
import ManageUsersTable from './ManageUsersTable'

// Manage users page - Table with all users
const ManageUsersPage = () => {
  const profile = useCurrentProfile()
  return <Container>
    {profile?.type === 'ADMIN' && <>
      <h1>Manage Users</h1>
      <ManageUsersTable />
    </>}

  </Container>
}

export default ManageUsersPage
