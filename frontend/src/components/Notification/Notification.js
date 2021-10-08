import React from 'react'
import {Container} from './notificationStyle'

// Component used for any notifications appearing in red (e.g. incorrect username or password)
const Notification = ({ isError, children }) =>
  <Container className={isError && 'error'}>
    {children}
  </Container>

export default Notification
