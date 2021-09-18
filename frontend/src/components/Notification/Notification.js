import React from 'react'
import {Container} from './notificationStyle'

const Notification = ({ isError, children }) =>
  <Container className={isError && 'error'}>
    {children}
  </Container>

export default Notification
