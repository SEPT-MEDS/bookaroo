import React from 'react'
import { useParams } from 'react-router-dom'

import { Spinner, Notification, BookInfo } from 'components'
import { getBook } from 'services'
import { useAsync } from 'hooks'

import BookSellers from './BookSellers'

import {
  Container,
} from './bookDetailPageStyle'

const BookDetailPage = () => {
  const { isbn } = useParams()
  const {response: book, error, isLoading} = useAsync(() => getBook(isbn), [isbn])

  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {error && <Notification isError={true}>{error}</Notification>}
          {book && <BookInfo book={book} />}
          {book && <BookSellers book={book}/>}
        </>
      )}
    </Container>
  )
}


export default BookDetailPage
