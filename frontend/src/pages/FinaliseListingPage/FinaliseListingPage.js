import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'

import { createListing } from 'services'
import { Spinner } from 'components'
import { useCurrentProfile } from 'hooks'

import { Container, Inputs, P, Heading, Form, InputContainer } from './finaliseListingPageStyle'

// Help message to assist the user
const HELP_MESSAGE =
  'Now we require some information about your particular item listing! Provide your details below. This information will be displayed as an individual listing under the book.'

// Final page in the listing creation process - Consists of adding attributes of listing (e.g. price, condition, swap)
const FinaliseListingPage = () => {
  const { isbn } = useParams()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, watch } = useForm()
  const watchIsSwap = watch('swap', false)
  const profile = useCurrentProfile()
  const isCustomer = profile?.type === 'CUSTOMER'
  const isAdmin = profile?.type === 'ADMIN'

  // Create a listing with the provided information
  const onSubmit = ({ swap, price, condition, imageUrl }) => {
    setLoading(true)
    createListing({
      bookIsbn: isbn,
      isSwap: swap,
      price,
      imageUrl,
      isPreowned: condition == 'preowned',
      sellerId: profile.id,
      isVisible: true,
    })
      // Take the user back to the book page of which they were creating a listing for
      .then(() => history.push(`/book/${isbn}`))
  }

  return (
    <Container>
      {loading ? (
        <Spinner />
      ) : (
        !isAdmin &&
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Heading> Almost Done! </Heading>
          <P>{HELP_MESSAGE}</P>

          {/* Inputs for listing creation */}
          <Inputs>
            <InputContainer>
              <label htmlFor='swap'>Do you want to swap for another book?</label>
              <input type='checkbox' {...register('swap')}/>
            </InputContainer>

            <InputContainer>
              <label htmlFor='price'>Price ($)</label>
              <input type='number' disabled={watchIsSwap} {...register('price')} />
            </InputContainer>

            <InputContainer>
              <label htmlFor='imageUrl'>Image URL</label>
              <input type='text' {...register('imageUrl')} />
            </InputContainer>

            <InputContainer>
              <label htmlFor='condition'>Condition</label>
              <select {...register('condition', { required: true })}>
                <option value={'preowned'}>Preowned</option>
                {!isCustomer && <option value={'new'}>Brand New</option>}
              </select>
            </InputContainer>
          </Inputs>

          <input type="submit" value="Next" />
        </Form>
      )}
    </Container>
  )
}

export default FinaliseListingPage