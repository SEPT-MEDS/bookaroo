import React from 'react'
import { useParams } from 'react-router-dom'

import { Spinner, Notification, BookSummary } from 'components'
import { getBook } from 'services'
import { useAsync } from 'hooks'

import BookSellers from './BookSellers'
import BookReviews from './BookReviews'

import {
  Container,
  BookInfoContainer,
  BookInfoPara,
  BookInfoDetails
} from './bookDetailPageStyle'

const BookDetailPage = () => {
  const { isbn } = useParams()
  const {response: book, error, isLoading} = useAsync(() => getBook(isbn), [isbn])
  // const {response: reviews } = useAsync(() => getReviews(isbn), [isbn])
  // const { review } = 'This is an amazing book!'

  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {error && <Notification isError={true}>{error}</Notification>}
          {book && <BookInfo book={book} />}
          {book && <BookSellers book={book} />}

          {book && <BookReviews book={book} />}
        </>
      )}
    </Container>
  )
}

const BookInfo = ({ book }) => {
  return (
    <BookInfoContainer>
      <BookSummary book={book} />
      <div>
        <h2>Blurb</h2>
        <BookInfoPara>{book.blurb || <em>No Blurb Provided</em>}</BookInfoPara>
        <BookInfoDetails>
          <div>
            <h2>Number of Pages</h2>
            <BookInfoPara>{book.numPages}</BookInfoPara>
          </div>
          <div>
            <h2>Category</h2>
            <BookInfoPara>{book.category || <em>No Category</em>}</BookInfoPara>
          </div>
        </BookInfoDetails>
      </div>
    </BookInfoContainer>
  )
}

export default BookDetailPage
