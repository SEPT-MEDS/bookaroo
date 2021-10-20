import React from 'react'
import { 
  Container, 
  AboutInfoContainer, 
  ContactPointsContainer 
} from './aboutPageStyle'
import { ContactPoint } from '../../components'

// Static page with information about Bookaroo
const AboutPage = () => {
  return (
    <Container>
      <AboutInfoContainer>
        <h1>About</h1>
        <p>
          Hi there! We are Bookaroo, a book sharing and shopping site. Our service will provide you with a way to sell, purchase, or swap books with other users or shop owners in the easiest way possible! Our mission is to help everyone to easily acquire books and read as much as possible. We are also available on various social medias as listed below. Enjoy shopping!
        </p>
      </AboutInfoContainer>
      <h3>Check out our socials below!</h3>
      <ContactPoints />
    </Container>
  )
}

// Icon and contact information for given platform
const ContactPoints = () =>
  <ContactPointsContainer>
    <ContactPoint contactType = 'facebook' />
    <ContactPoint contactType = 'twitter' />
    <ContactPoint contactType = 'instagram' />
  </ContactPointsContainer>

export default AboutPage
