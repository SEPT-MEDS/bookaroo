import React from 'react'
// import React, { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { Link, useHistory } from 'react-router-dom'
import { Heading, Container, AdminLinkContainer, AdminLink } from './adminPageStyle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faDollarSign, faBook, faFile } from '@fortawesome/free-solid-svg-icons'

const AdminPage = () => {
  // 2x2 grid
  return <Container>
    <Heading>Admin Dashboard</Heading>
    <AdminLinkContainer>
      <AdminLink to='#'>
        <FontAwesomeIcon icon={faUser} />
        Manage Users
      </AdminLink>
      <AdminLink to='#'>
        <FontAwesomeIcon icon={faDollarSign} />
        Transactions
      </AdminLink>
      <AdminLink to='#'>

        <FontAwesomeIcon icon={faBook} />
        Manage Books
      </AdminLink>
      <AdminLink to='#'>

        <FontAwesomeIcon icon={faFile} />
        Reports
      </AdminLink>
    </AdminLinkContainer>
  </Container>
}

export default AdminPage