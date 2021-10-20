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

// Menu that appears after clicking name/profile image in the top right of navbar
const ProfileMenu = ({ profile }) => {
  const openRef = useRef(null)
  const menuRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const { authLogout } = useAuth()
  const history = useHistory()

  // Log out functionality
  const handleLogout = () => {
    authLogout()
    history.push('/login')
  }

  // Remove menu when clicking outside it (i.e. somewhere else on the page)
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
        {/* Individual links within menu */}
        <Link to={`/user/${profile.id}`}>My Profile</Link>
        <Link to='/transactions'>Order History</Link>
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
