import React, { useState } from 'react'

import { Logo } from '../'
import { NavBar } from './navigationStyle'

const Navigation = () => {
  const [user] = useState(null /* TODO */)
  const [isAdmin] = useState(false /* TODO */)

  return <NavBar>
    <Logo />
    { user && (isAdmin ? <AdminFields /> : <CustomerFields />) }
    { user && !isAdmin && <ShoppingCart /> }
    { user
      ? <SignedInFields />
      : <SignedOutFields />
    }
  </NavBar>
}

const ShoppingCart = () => <></>

const AdminFields = () => <></>
const CustomerFields = () => <></>
const SignedInFields = () => <></>
const SignedOutFields = () => <></>

export default Navigation
