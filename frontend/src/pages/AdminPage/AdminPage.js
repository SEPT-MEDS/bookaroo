import React from 'react'
import { Heading, Container, AdminLinkContainer, AdminLink } from './adminPageStyle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faDollarSign, faBook, faFile } from '@fortawesome/free-solid-svg-icons'

const AdminPage = () => {
  return <Container>
    <Heading>Admin Dashboard</Heading>
    <AdminLinkContainer>
      <AdminLink to='/admin/manage-users'>
        <FontAwesomeIcon icon={faUser} />
        Manage Users
      </AdminLink>
      <AdminLink to='/admin/transactions'>
        <FontAwesomeIcon icon={faDollarSign} />
        Transactions
      </AdminLink>
      <AdminLink to='/admin/manage-books'>

        <FontAwesomeIcon icon={faBook} />
        Manage Books
      </AdminLink>
      <AdminLink to='/admin/reports'>

        <FontAwesomeIcon icon={faFile} />
        Reports
      </AdminLink>
    </AdminLinkContainer>
  </Container>
}

export default AdminPage