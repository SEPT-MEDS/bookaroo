import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import BookPage from './BookPage/BookPage'

const PrivateRoute = props => {
  const [isLoggedIn] = useState(true /* TODO */)

  useEffect(() => {
    // some auth observer that calls setIsLoggedIn()
  })

  return isLoggedIn ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
  )
}

const Pages = () => {
  return <Router>
    <PrivateRoute path='/' component={BookPage} />
  </Router>
}

export default Pages
