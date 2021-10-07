import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { useAsync, useCurrentProfile } from 'hooks'
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

const HELP_MESSAGE =
  'Next, we require some general information about the book you are attempting to list. This information will be shown to users searching for this book, so make sure there are no errors!'

const CreateBookPage = () => {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const { isbn } = useParams()
  const { register, handleSubmit, setValue } = useForm()
  const { response: apiRes } = useAsync(() => getOLBookDetails(isbn))
  const profile = useCurrentProfile()

  useEffect(() => {
    if (apiRes) {
      setValue('title', apiRes.title)
      setValue('num_pages', apiRes.number_of_pages)
      setValue('category', apiRes.subjects && apiRes.subjects[0])
      setValue('summary', apiRes?.description?.value)
      setValue('author', apiRes?.author?.name)
    }
  }, [apiRes])

  const onSubmit = ({ summary, author, num_pages, title, category }) => {
    setIsLoading(true)
    createBook({
      isbn,
      blurb: summary,
      author,
      num_pages,
      title,
      category,
      url: 'null',
      rating: 0
    }).then(() => {
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
          <Heading> Sell a Book </Heading>
          <P>{HELP_MESSAGE}</P>
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
              <input type="submit" value="Next" />
            </InputsContainer>
          </Columns>
        </Form>
      )}
    </Container>
  )
}

export default CreateBookPage
