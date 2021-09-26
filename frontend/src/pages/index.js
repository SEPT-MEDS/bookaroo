import React, { useEffect } from 'react'
import {
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom'

import { useAuth } from '../hooks'
import { Navigation } from '../components'
import BookPage from './BookPage/BookPage'
import LoginPage from './LoginPage/LoginPage'
import ContactPage from './ContactPage/ContactPage'
import AboutPage from './AboutPage/AboutPage'
import BusinessSignupPage from './BusinessSignupPage/BusinessSignupPage'
import CustomerSignupPage from './CustomerSignupPage/CustomerSignupPage'
import BookDetailPage from './BookDetailPage/BookDetailPage'
import AdminPage from './AdminPage/AdminPage'
import ManageUsersPage from './ManageUsersPage/ManageUsersPage'
import TransactionsPage from './TransactionsPage/TransactionsPage'
import ManageBooksPage from './ManageBooksPage/ManageBooksPage'
import ReportsPage from './ReportsPage/ReportsPage'
import ListingDetailPage from './ListingDetailPage/ListingDetailPage'
import CreateListingPage from './CreateListingPage/CreateListingPage'
import FinaliseListingPage from './FinaliseListingPage/FinaliseListingPage'
import CreateBookPage from './CreateBookPage/CreateBookPage'
import ProfileDetailPage from './ProfileDetailPage/ProfileDetailPage'

const PrivateRoute = props => {
  const { isLoggedIn } = useAuth()

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
        <PrivateRoute path="/book/:isbn" exact component={BookDetailPage} />
        <PrivateRoute path="/book/new/:isbn" exact component={CreateBookPage} />
        <PrivateRoute path="/listing/new/:isbn" exact component={FinaliseListingPage} />
        <PrivateRoute path="/listing/new" exact component={CreateListingPage} />
        <PrivateRoute path="/admin" exact component={AdminPage} />
        <PrivateRoute path="/admin/manage-users" exact component={ManageUsersPage} />
        <PrivateRoute path="/admin/transactions" exact component={TransactionsPage} />
        <PrivateRoute path="/admin/manage-books" exact component={ManageBooksPage} />
        <PrivateRoute path="/admin/reports" exact component={ReportsPage} />
        <PrivateRoute path="/listing/:id" exact component={ListingDetailPage} />
        <PrivateRoute path="/user/:id" exact component={ProfileDetailPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/contact" exact component={ContactPage} />
        <Route path="/about" exact component={AboutPage} />
        <Route path="/signup/business" exact component={BusinessSignupPage} />
        <Route path="/signup/customer" exact component={CustomerSignupPage} />
      </Switch>
    </>
  )
}

export default Pages
