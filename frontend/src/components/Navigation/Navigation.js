import React from 'react'
import { NavLink } from 'react-router-dom'

import { Logo, ProfileMenu } from 'components'
import { useCurrentProfile } from 'hooks'
import { NavBar, NavItems } from './navigationStyle'

const Navigation = () => {
  const profile = useCurrentProfile()
  const isAdmin = profile?.type == 'ADMIN'

  return (
    <NavBar>
      <NavLink to="/">
        <Logo />
      </NavLink>
      <NavItems>
        {profile && (isAdmin ? <AdminFields /> : <CustomerFields />)}
        {profile ? <SignedInFields profile={profile} /> : <SignedOutFields />}
      </NavItems>
    </NavBar>
  )
}

const AdminFields = () => <>
  <NavLink to='/listing/new'>Add a book</NavLink>
</>

const CustomerFields = () => <>
  <NavLink to='/listing/new'>Sell a Book</NavLink>
</>

const SignedInFields = ({ profile }) => <>
  <ProfileMenu profile={profile} />
</>

const SignedOutFields = () => <></>

export default Navigation
