import React from 'react'
import { NavLink } from 'react-router-dom'

import { Logo, ProfileMenu } from 'components'
import { useCurrentProfile } from 'hooks'
import { NavBar, NavItems } from './navigationStyle'

// Consistent navigation bar across top of screen
const Navigation = () => {
  const profile = useCurrentProfile()
  const isAdmin = profile?.type == 'ADMIN'

  return (
    <NavBar>
      {/* Navigate different users to different pages on click of logo */}
      <NavLink to={isAdmin ? '/admin' : '/'}>
        <Logo />
      </NavLink>
      {/* Include appropriate fields depending on user type */}
      <NavItems>
        {profile && (isAdmin ? <AdminFields /> : <CustomerFields />)}
        {profile ? <SignedInFields profile={profile} /> : <SignedOutFields />}
      </NavItems>
    </NavBar>
  )
}

// "Add a book" on navbar
const AdminFields = () => <>
  <NavLink to='/listing/new'>Add a book</NavLink>
</>

// "Sell a book" on navbar
const CustomerFields = () => <>
  <NavLink to='/listing/new'>Sell a Book</NavLink>
</>

// Profile on navbar
const SignedInFields = ({ profile }) => <>
  <ProfileMenu profile={profile} />
</>

// Nothing on navbar
const SignedOutFields = () => <></>

export default Navigation
