import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import {
  faTwitter,
  faInstagram,
  faFacebookF,
} from '@fortawesome/free-brands-svg-icons'

import { ContactPointContainer } from './contactPointStyle'

// Contains numerous contact points, each of which include an image and contact information
const ContactPoint = ({ contactType }) => {

  if (contactType === 'envelope')
    return <ContactPointContainer>
      <FontAwesomeIcon icon={faEnvelope} />
      <span>contact@bookaroo.com</span>
    </ContactPointContainer>

  if (contactType === 'phone')
    return <ContactPointContainer>
      <FontAwesomeIcon icon={faPhoneAlt} />
      <span>+61 1234 567 890</span>
    </ContactPointContainer>

  if (contactType === 'facebook')
    return <ContactPointContainer>
      <FontAwesomeIcon icon={faFacebookF} />
      <span>facebook.com/bookaroo</span>
    </ContactPointContainer>

  if (contactType === 'twitter')
    return <ContactPointContainer>
      <FontAwesomeIcon icon={faTwitter} />
      <span>@bookaroo</span>
    </ContactPointContainer>

  if (contactType === 'instagram')
    return <ContactPointContainer>
      <FontAwesomeIcon icon={faInstagram} />
      <span>@bookaroo</span>
    </ContactPointContainer>

  return <>Invalid Contact Type</>
}

export default ContactPoint
