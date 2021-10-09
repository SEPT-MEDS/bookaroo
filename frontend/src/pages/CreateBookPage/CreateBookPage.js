import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { useDebounce, useAsync, useCurrentProfile } from 'hooks'
import { createBook, getOLBookDetails } from 'services'
import { Spinner, BookCover } from 'components'
import {
  Heading,
  P,
  InputWrapper,
  Container,
  Form,
  InputsContainer,
  Columns,
} from './createBookPageStyle'

// Message at the top of the screen to assist the user
const HELP_MESSAGE = 'Next, we require some general information about the book you are attempting to list. This information will be shown to users searching for this book, so make sure there are no errors!'

// Page to fill in details of a book
const CreateBookPage = () => {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const { isbn } = useParams()
  const { register, handleSubmit, setValue, watch } = useForm()
  const { response: apiRes } = useAsync(() => getOLBookDetails(isbn))
  const profile = useCurrentProfile()
  const watchUrl = watch('url', '')
  const debouncedImageUrl = useDebounce(watchUrl, 300)

  // Pre-fill fields with information from OpenLibrary API (if applicable)
  useEffect(() => {
    if (apiRes) {
      setValue('title', apiRes.title)
      setValue('num_pages', apiRes.number_of_pages)
      setValue('category', apiRes.subjects && apiRes.subjects[0])
      setValue('summary', apiRes?.description?.value)
      setValue('url', `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`)
      setValue('author', apiRes?.author?.name)
    }
  }, [apiRes])

  // Create a book with the provided information
  const onSubmit = ({ summary, author, num_pages, title, category, url }) => {
    setIsLoading(true)
    createBook({
      isbn,
      blurb: summary,
      author,
      numPages: num_pages,
      title,
      category,
      url,
      rating: 0
    }).then(() => {
      // Admin taken to home page, other users are taken to create a listing
      profile.type === 'ADMIN'
        ? history.push('/')
        : history.push(`/listing/new/${isbn}`)
    })
  }

  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Change heading based on user type */}
          <Heading>{profile?.type === 'ADMIN' ? 'Create a Book' : 'Sell a Book'}</Heading>

          {/* Display help message */}
          <P>{HELP_MESSAGE}</P>
          <Columns>

            {/* Cover image for the book */}
            <div>
              <BookCover isbn={isbn} imageUrl={debouncedImageUrl !== '' && debouncedImageUrl}/>
            </div>

            {/* Inputs for the book creation */}
            <InputsContainer>
              <InputWrapper>
                <label htmlFor="title">Title</label>
                <input type="text" {...register('title', { required: true })} />
              </InputWrapper>
              <InputWrapper>
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  {...register('author', { required: true })}
                />
              </InputWrapper>
              <InputWrapper>
                <label htmlFor="author">Category</label>
                <input
                  type="text"
                  {...register('category', { required: true })}
                />
              </InputWrapper>
              <InputWrapper>
                <label htmlFor="num_pages">Number of Pages</label>
                <input
                  type="number"
                  {...register('num_pages', { required: true })}
                />
              </InputWrapper>
              <InputWrapper>
                <label htmlFor="url">Image URL</label>
                <input
                  type="text"
                  {...register('url', { required: true })}
                />
              </InputWrapper>
              <InputWrapper>
                <label htmlFor="summary">Summary</label>
                <textarea
                  {...register('summary', { required: true })}
                ></textarea>
              </InputWrapper>
              <input type="submit" value={profile?.type === 'ADMIN' ? 'Create Book' : 'Next'} />
            </InputsContainer>
          </Columns>
        </Form>
      )}
    </Container>
  )
}

export default CreateBookPage
