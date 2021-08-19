import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import {
  faTwitter,
  faInstagram,
  faFacebookF,
} from '@fortawesome/free-brands-svg-icons'
import {
  Container,
  ContactPointOld,
  EmailForm,
  Field,
  RequiredLabel,
  FieldGroup,
  ContactInfoContainer,
  ContactPointsContainer,
} from './contactPageStyle'

// import { ContactPoint } from 'components'

const ContactPage = () => {
  return (
    <Container>
      <EmailForm>
        <FieldGroup>
          <Field>
            <RequiredLabel htmlFor="fname">First Name</RequiredLabel>
            <input type="text" id="fname" name="fname" placeholder="John"></input>
          </Field>
          <Field>
            <RequiredLabel htmlFor="lname">Last Name</RequiredLabel>
            <input type="text" id="lname" name="lname" placeholder="Doe"></input>
          </Field>
        </FieldGroup>
        <Field>
          <RequiredLabel htmlFor="email">Email</RequiredLabel>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="john_doe@example.com"
          ></input>
        </Field>
        <Field>
          <RequiredLabel htmlFor="subject">Subject</RequiredLabel>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="How do I refund this book?"
          ></input>
        </Field>
        <Field>
          <RequiredLabel htmlFor="message">Message</RequiredLabel>
          <textarea type="text" id="message" name="message" resize="false"></textarea>
        </Field>
        <input type="button" id="send" name="send" value="Send Email"></input>
      </EmailForm>
      <ContactInfo />
      <ContactPoints />
    </Container>
  )
}

const ContactInfo = () =>
  <ContactInfoContainer>
    <h1>Contact Us</h1>
    <p>
      Have a problem, suggestion, or query? Simply fill out the form below to
      send us an email, or use our other points of contact and we&apos;ll be
      happy to help!
    </p>
  </ContactInfoContainer>

const ContactPoints = () =>
  <ContactPointsContainer>
    <ContactPointOld>
      <FontAwesomeIcon icon={faEnvelope} />
      <span>contact@bookaroo.com</span>
    </ContactPointOld>
    <ContactPointOld>
      <FontAwesomeIcon icon={faPhoneAlt} />
      <span>+61 1234 567 890</span>
    </ContactPointOld>
    <ContactPointOld>
      <FontAwesomeIcon icon={faFacebookF} />
      <span>facebook.com/bookaroo</span>
    </ContactPointOld>
    <ContactPointOld>
      <FontAwesomeIcon icon={faTwitter} />
      <span>@bookaroo</span>
    </ContactPointOld>
    <ContactPointOld>
      <FontAwesomeIcon icon={faInstagram} />
      <span>@bookaroo</span>
    </ContactPointOld>
  </ContactPointsContainer>

export default ContactPage
