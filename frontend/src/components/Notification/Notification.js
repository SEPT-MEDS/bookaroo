import React from 'react'
import {Container} from './notificationStyle'

// Component used for any notifications
// including error notifications e.g incorrect password or 'something went wrong'
const Notification = ({ isError, children }) =>
  <Container className={isError && 'error'}>
    {children}
  </Container>

export default Notification
