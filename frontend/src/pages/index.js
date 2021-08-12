import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import BookPage from './BookPage/BookPage'
import LoginPage from './LoginPage/LoginPage'

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
    <PrivateRoute path='/' exact component={BookPage} />
    <Route path='/login' exact component={LoginPage} />
  </Router>
}

export default Pages
