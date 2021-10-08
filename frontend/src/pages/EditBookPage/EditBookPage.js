import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { useAsync } from 'hooks'
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

const EditBookPage = () => {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const { isbn } = useParams()
  const { register, handleSubmit, setValue } = useForm()
  const { response: book } = useAsync(() => getBook(isbn))

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
      .then(() => history.push(`/book/${isbn}`))
  }


  useEffect(() => {
    // Pre-fill edit page fields
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
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Heading> Edit a Book </Heading>
          <Columns>
            <div>
              <BookCover isbn={isbn} imageUrl={book?.url}/>
            </div>
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