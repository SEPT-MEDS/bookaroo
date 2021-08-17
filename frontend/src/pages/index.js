import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import BookPage from './BookPage/BookPage'
import LoginPage from './LoginPage/LoginPage'
import ContactPage from './ContactPage/ContactPage'
import AboutPage from './AboutPage/AboutPage'

const PrivateRoute = props => {
  const [isLoggedIn] = useState(false /* TODO: For now we assume you are logged in*/)

  useEffect(() => {
    // some auth observer that calls setIsLoggedIn()
  })

  return isLoggedIn ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )
}

const Pages = () => {
  return (
    <Router>
      <PrivateRoute path="/" exact component={BookPage} />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/contact" exact component={ContactPage} />
      <Route path="/about" exact component={AboutPage} />
    </Router>
  )
}

export default Pages
