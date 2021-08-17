import React from 'react'

import { Logo } from './navigationStyle'

const Navigation = () => {
  const [isAdmin] = useState(false /* TODO */)

  return <NavBar>
    <Logo />
    { user && (admin ? <AdminFields /> : <CustomerFields />) }
    { user && !admin && <ShoppingCart /> }
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
