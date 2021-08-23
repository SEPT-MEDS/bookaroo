import React, { useEffect } from 'react'
import {
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom'

import { useToken } from '../hooks'
import { Navigation } from '../components'
import BookPage from './BookPage/BookPage'
import LoginPage from './LoginPage/LoginPage'
import ContactPage from './ContactPage/ContactPage'
import AboutPage from './AboutPage/AboutPage'

const PrivateRoute = props => {
  const { isLoggedIn } = useToken()

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
  const location = useLocation()
  const pagesWithoutNav = ['login', 'signup']
  return (
    <>
      {/* Only show nav on some pages */}
      {!pagesWithoutNav.includes(
        location.pathname.split('/').filter(x => x)[0]
      ) && <Navigation />}

      <Switch>
        <PrivateRoute path="/" exact component={BookPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/contact" exact component={ContactPage} />
        <Route path="/about" exact component={AboutPage} />
      </Switch>
    </>
  )
}

export default Pages
