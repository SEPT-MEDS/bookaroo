import React from 'react'
import { useParams } from 'react-router-dom'

import { BookCover, Rating, Spinner, Notification } from 'components'
import { getBook } from 'services'
import { useAsync } from 'hooks'

import BookSellers from './BookSellers'

import {
  Container,
  BookInfoContainer,
  BookInfoPara,
  BookInfoAuthor,
  BookInfoDetails
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

const BookInfo = ({ book }) => {
  return (
    <BookInfoContainer>
      <div>
        <BookCover isbn={book.isbn} />
        <h1>{book.title}</h1>
        <BookInfoAuthor>{book.author}</BookInfoAuthor>
        <Rating rating={book.rating} />
      </div>
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
