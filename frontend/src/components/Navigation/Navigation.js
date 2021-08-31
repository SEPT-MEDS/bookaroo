import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { Logo, ProfileMenu } from '../'
import { NavBar } from './navigationStyle'
import { useCurrentProfile } from '../../hooks'

const Navigation = () => {
  const profile = useCurrentProfile()
  const [isAdmin] = useState(false /* TODO */)

  return (
    <NavBar>
      <NavLink to="/">
        <Logo />
      </NavLink>
      {profile && (isAdmin ? <AdminFields /> : <CustomerFields />)}
      {profile && !isAdmin && <ShoppingCart />}
      {profile ? <SignedInFields profile={profile} /> : <SignedOutFields />}
    </NavBar>
  )
}

const ShoppingCart = () => <></>

const AdminFields = () => <></>
const CustomerFields = () => <></>
const SignedInFields = ({ profile }) => (
  <>
    <ProfileMenu profile={profile} />
  </>
)
const SignedOutFields = () => <></>

export default Navigation
