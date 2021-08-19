import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { ContactPageStyle, ContactPoint, EmailForm, Field, ContactUs } from './contactPageStyle'

const ContactPage = () => {
  return (
    <ContactPageStyle>
      <div className='left'>
        <form>
          <EmailForm>
            <Field>
              <label htmlFor='fname'>
                First Name<span style={{ color: 'red' }}>*</span>
              </label>
              <br></br>
              <input type='text' id='fname' name='fname' placeholder='John'></input>
              <br></br>
            </Field>

            <Field>
              <label htmlFor='lname'>
                Last Name<span style={{ color: 'red' }}>*</span>
              </label>
              <br></br>
              <input type='text' id='lname' name='lname' placeholder='Doe'></input>
              <br></br>
            </Field>

            <Field>
              <label htmlFor='email'>
                Email<span style={{ color: 'red' }}>*</span>
              </label>
              <br></br>
              <input type='text' id='email' name='email' placeholder='john_doe@example.com'></input>
              <br></br>
            </Field>

            <Field>
              <label htmlFor='subject'>
                Subject<span style={{ color: 'red' }}>*</span>
              </label>
              <br></br>
              <input type='text' id='subject' name='subject' placeholder='How do I refund this book?'></input>
              <br></br>
            </Field>

            <Field>
              <label htmlFor='message'>
                Message<span style={{ color: 'red' }}>*</span>
              </label>
              <br></br>
              <input type='text' id='message' name='message'></input>
              <br></br>
            </Field>

            <input type='button' id='send' name='send' value='Send Email'></input>
          </EmailForm>
        </form>
      </div>

      {/* vertical divider */}
      <div className='divider'></div>

      <div className='right'>
        <ContactUs>
          <h1>Contact Us</h1>
          <p>
            Have a problem, suggestion, or query? Simply fill out the form below to send us an email, or use our other
            points of contact and we&apos;ll be happy to help!
          </p>
          <ContactPoint>
            <FontAwesomeIcon className='icon' icon={faEnvelope} />
            <p>contact@bookaroo.com</p>
          </ContactPoint>
          <ContactPoint>
            <FontAwesomeIcon className='icon' icon={faPhoneAlt} />
            <p>+61 1234 567 890</p>
          </ContactPoint>
          <ContactPoint>
            <FontAwesomeIcon className='icon' icon={faFacebookF} />
            <p>facebook.com/bookaroo</p>
          </ContactPoint>
          <ContactPoint>
            <FontAwesomeIcon className='icon' icon={faTwitter} />
            <p>@bookaroo</p>
          </ContactPoint>
          <ContactPoint>
            <FontAwesomeIcon className='icon' icon={faInstagram} />
            <p>@bookaroo</p>
          </ContactPoint>
        </ContactUs>
      </div>
    </ContactPageStyle>
  )
}

export default ContactPage
