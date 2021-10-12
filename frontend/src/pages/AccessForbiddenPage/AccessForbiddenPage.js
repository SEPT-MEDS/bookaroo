import React from 'react'

import { Container, Heading, Image, StyledLink } from './accessForbiddenPageStyle'

const IMAGE_ADDR = 'aHR0cHM6Ly9jLnRlbm9yLmNvbS9iSUphMnVSVVJpUUFBQUFkL2xvcmQtb2YtdGhlLXJpbmdzLXlvdS1zaGFsbC1ub3QtcGFzcy5naWY='

const AccessForbiddenPage = () => {
  return <Container>
    <Heading>403</Heading>
    <span>{'You don\'t have permission to access that page'}</span>
    <Image src={atob(IMAGE_ADDR)}></Image>
    <StyledLink to='/'>My bad! Take me back!</StyledLink>
  </Container>
}

export default AccessForbiddenPage 
