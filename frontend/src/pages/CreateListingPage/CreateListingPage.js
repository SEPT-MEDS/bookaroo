import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Spinner } from 'components'
import { getBook } from 'services'

import { P, Form, Container, Heading, InputContainer } from './createListingPageStyle'
import { useCurrentProfile } from 'hooks'


const CreateListingPage = () => {
  const [isbn, setISBN] = useState('')
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const profile = useCurrentProfile()

  // Title of the page depending on the user type
  const PAGE_TITLE = profile?.type === 'ADMIN'
    ? 'Create a book'
    : 'Sell a book'

  // Help message (paragraph) depending on the user type
  const helpMessage = profile?.type === 'ADMIN'
    ? 'Welcome to the book creation page. As an admin you are able to add new books to the Bookaroo system! If you attempt to add a book with an ISBN that already exists within the system, you will be unable to continue.'
    : 'Welcome to the book listing process! The first step is to enter the ISBN of your book. If we find that this book already exists within our system, you will be redirected to enter your vendor information, otherwise you will need to provide information about the book itself.'


  const onSubmit = e => {
    e.preventDefault()
    setError()
    if (!isbn || isbn?.length < 10) {
      setError('ISBN is required')
      return
    }

    setLoading(true)
    getBook(isbn)
      .then(() => {
        profile?.type === 'ADMIN'
          ? (setLoading(false),
          setError('You cannot create new listings as an admin (this ISBN already exists)')
          ) : (
            setLoading(false),
            history.push(`/listing/new/${isbn}`)
          )
      })
      .catch (e => {
        if (e?.response?.status == 404) {
          history.push(`/book/new/${isbn}`)
        }
      })

  }

  return (
    <Container>
      {loading ? (
        <Spinner />
      ) : (
        <Form onSubmit={onSubmit}>
          <Heading>{PAGE_TITLE}</Heading>
          <P>{helpMessage}</P>
          <InputContainer>
            <label>ISBN</label>
            <input maxLength={13} value={isbn} type='text' pattern='\d{10,13}' onChange={e => setISBN(e.target.value)} />
          </InputContainer>
          {error}
          <input type="submit" value="Next" />
        </Form>
      )}
    </Container>
  )
}

export default CreateListingPage
