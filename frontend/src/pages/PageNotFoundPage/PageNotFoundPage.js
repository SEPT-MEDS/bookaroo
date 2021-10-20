import React from 'react'

import { Container, Heading, CatImage, StyledLink } from './pageNotFoundPageStyle'

const PageNotFoundPage = () => {
  return <Container>
    <Heading>404</Heading>
    <span>That page does not exist.</span>
    <CatImage src='https://cataas.com/cat/gif'></CatImage>
    <StyledLink to='/'>Back to Safety</StyledLink>
  </Container>
}

export default PageNotFoundPage
