import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { Logo, ProfileMenu } from 'components'
import { useCurrentProfile } from 'hooks'
import { NavBar, NavItems } from './navigationStyle'

const Navigation = () => {
  const profile = useCurrentProfile()
  const [isAdmin] = useState(false /* TODO */)

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
  <NavLink to='/create-listing'>Add a Listing</NavLink>
</>

const CustomerFields = () => <>
  <NavLink to='/create-listing'>Sell a Book</NavLink>
</>

const SignedInFields = ({ profile }) => <>
  <ProfileMenu profile={profile} />
</>

const SignedOutFields = () => <></>

export default Navigation
