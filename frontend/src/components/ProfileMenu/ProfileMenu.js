import React, { useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { useAuth, useOnOutsideClick } from '../../hooks'
import {
  Container,
  Icon,
  MenuBox,
  LogoutButton,
  SiteInfoContainer,
} from './profileMenuStyle'

const ProfileMenu = ({ profile }) => {
  const openRef = useRef(null)
  const menuRef = useRef(null)
  const [isOpen, setIsOpen] = useState(true)
  const {logout} = useAuth()
  const history = useHistory()

  const handleLogout = () => {
    logout()
    history.push('/login')
  }

  useOnOutsideClick(menuRef, e => {
    if (e.target.parentNode !== openRef.current)
      setIsOpen(false)
  })

  return (
    <Container
      ref={openRef}
      onClick={() => {
        setIsOpen(!isOpen)
      }}
    >
      <span>{profile.username}</span>
      <MenuBox
        className={isOpen ? 'open' : 'closed'}
        onClick={e => e.stopPropagation()}
        ref={menuRef}
      >
        <Link to='#'>My Profile</Link>
        <Link to='#'>View Cart</Link>
        <Link to='#'>Settings</Link>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        <SiteInfoContainer>
          <Link to='/contact'>Contact Us</Link>
          <Link to='/about'>About Us</Link>
        </SiteInfoContainer>
      </MenuBox>
      <Icon />
    </Container>
  )
}

export default ProfileMenu
