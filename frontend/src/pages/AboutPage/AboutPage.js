import React from 'react'
import { 
  Container, 
  AboutInfoContainer, 
  ContactPointsContainer 
} from './aboutPageStyle'
import { ContactPoint } from '../../components'

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

const ContactPoints = () =>
  <ContactPointsContainer>
    <ContactPoint contactType = 'facebook'></ContactPoint>
    <ContactPoint contactType = 'twitter'></ContactPoint>
    <ContactPoint contactType = 'instagram'></ContactPoint>
  </ContactPointsContainer>

export default AboutPage
