import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { createListing } from 'services'
import { Spinner } from 'components'
import { useCurrentProfile } from 'hooks'

import { Container, Inputs, P, Heading, Form, InputContainer } from './finaliseListingPageStyle'

const HELP_MESSAGE =
  'Now we require some information about your particular item listing! Provide your details below. This information will be displayed as an individual listing under the book.'

const FinaliseListingPage = () => {
  const { isbn } = useParams()
  const profile = useCurrentProfile()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, watch } = useForm()
  const watchIsSwap = watch('swap', false)

  const onSubmit = ({ swap, price, condition }) => {
    setLoading(true)
    createListing({
      isbn,
      swap,
      price,
      condition,
      sellerId: profile.id
    })
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
              <label htmlFor='condition'>Condition</label>
              <select {...register('condition', { required: true })}>
                <option>Brand New</option>
                <option>Preowned</option>
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
