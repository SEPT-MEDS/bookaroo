import React from 'react'
import { AboutInfoContainer, ContactPointsContainer } from './aboutPageStyle'
import { ContactPoint } from '../../components'

const AboutPage = () => {
  return <div className = "aboutPage">
    <AboutInfoContainer>
      <h1>About</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sodales 
        risus sed tincidunt maximus. Donec ut sapien sollicitudin, consequat leo 
        vitae, porta arcu. Morbi nec tincidunt ex, eu gravida sem. Curabitur 
        vulputate, arcu sit amet ornare semper, ante purus placerat ante, sed 
        pellentesque purus tellus id magna.
      </p>
    </AboutInfoContainer>
    <h3>Check out our socials below!</h3>
    <ContactPoints></ContactPoints>
  </div>
}

const ContactPoints = () =>
  <ContactPointsContainer>
    <ContactPoint contactType = 'facebook'></ContactPoint>
    <ContactPoint contactType = 'twitter'></ContactPoint>
    <ContactPoint contactType = 'instagram'></ContactPoint>
  </ContactPointsContainer>

export default AboutPage
