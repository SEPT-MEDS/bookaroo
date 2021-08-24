import React, { useState } from 'react'

import { Container, Icon, MenuBox } from './profileMenuStyle'

const ProfileMenu = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(true)
  return <Container onClick={() => setIsOpen(!isOpen)}>
    <span>{profile.username}</span>
    <MenuBox className={isOpen ? 'open' : 'closed'}>
      <a>Logout</a>
    </MenuBox>
    <Icon />
  </Container>
}

export default ProfileMenu
