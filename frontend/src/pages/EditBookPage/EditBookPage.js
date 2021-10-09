import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { useDebounce, useAsync, useCurrentProfile } from 'hooks'
import { patchBook, getBook } from 'services'
import { Spinner, BookCover } from 'components'

import {
  Heading,
  InputWrapper,
  Container,
  Form,
  InputsContainer,
  Columns,
} from './editBookPageStyle'

// Page used for editing books - Similar to book creation page
const EditBookPage = () => {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const { isbn } = useParams()
  const { register, handleSubmit, setValue, watch } = useForm()
  const { response: book } = useAsync(() => getBook(isbn))
  const profile = useCurrentProfile()
  const watchUrl = watch('url', '')
  const debouncedImageUrl = useDebounce(watchUrl, 300)

  // Patch (update) the book with the new information
  const onSubmit = ({ summary, author, num_pages, title, category, url }) => {
    setIsLoading(true)
    patchBook(isbn,
      {
        isbn,
        blurb: summary,
        author,
        numPages: num_pages,
        title,
        category,
        url,
        rating: 0
      })
      // Take the admin back to the book page
      .then(() => history.push(`/book/${isbn}`))
  }


  // Pre-fill edit page fields with current book information
  useEffect(() => {
    if (book) {
      setValue('title', book.title)
      setValue('num_pages', book.numPages)
      setValue('category', book.category)
      setValue('author', book.author)
      setValue('url', book.url)
      setValue('summary', book.blurb)
    }
  }, [book])
  
  return (
    <Container>
      {isLoading || !book ? (
        <Spinner />

      // Restrict page to admin only
      ) : (profile?.type === 'ADMIN' &&
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Heading> Edit a Book </Heading>
          <Columns>
            <div>
              <BookCover isbn={isbn} imageUrl={debouncedImageUrl !== '' && debouncedImageUrl}/>
            </div>
            {/* Forms with book information */}
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
                <input type="text" {...register('url', { required: true })} />
              </InputWrapper>

              <InputWrapper>
                <label htmlFor="summary">Summary</label>
                <textarea
                  {...register('summary', { required: true })}
                ></textarea>
              </InputWrapper>
              
              <input type="submit" value="Update Book" />
            </InputsContainer>
          </Columns>
        </Form>
      )}
    </Container>
  )
}

export default EditBookPage
