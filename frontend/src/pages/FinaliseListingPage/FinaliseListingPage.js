import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'

import { createListing } from 'services'
import { Spinner } from 'components'
import { useCurrentProfile } from 'hooks'

import { Container, Inputs, P, Heading, Form, InputContainer } from './finaliseListingPageStyle'

const HELP_MESSAGE =
  'Now we require some information about your particular item listing! Provide your details below. This information will be displayed as an individual listing under the book.'

const FinaliseListingPage = () => {
  const { isbn } = useParams()
  const history = useHistory()
  const profile = useCurrentProfile()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, watch } = useForm()
  const watchIsSwap = watch('swap', false)

  const isCustomer = profile?.type == 'CUSTOMER'

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
    }).then(() => history.push(`/book/${isbn}`))
  }

  return (
    <Container>
      {loading ? (
        <Spinner />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Heading> Almost Done! </Heading>
          <P>{HELP_MESSAGE}</P>
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
