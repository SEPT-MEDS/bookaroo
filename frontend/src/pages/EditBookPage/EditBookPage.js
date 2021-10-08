import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

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
  const { register, handleSubmit } = useForm()
  const book = getBook(isbn).then(b => console.log(b.title))
  console.log( book)
  // console.log(book?.title)

  const onSubmit = ({ summary, author, num_pages, title, category }) => {
    setIsLoading(true)
    patchBook(isbn,
      {
        isbn,
        blurb: summary,
        author,
        num_pages,
        title,
        category,
        url: 'null',
        rating: 0
      })
      .then(() => history.push(`/book/${isbn}`))
  }

  return (
    <Container>
      {isLoading || !book ? (
        <Spinner />
      ) : (
        <Form onSubmit={() => handleSubmit(onSubmit)}>
          <Heading> Edit a Book </Heading>
          <Columns>
            <div>
              <BookCover isbn={isbn} />
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