import React from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'

import { Spinner, Notification, BookSummary, Button } from 'components'
import { deleteBook, getBook } from 'services'
import { useAsync, useCurrentProfile } from 'hooks'

import BookSellers from './BookSellers'
import BookReviews from './BookReviews'

import {
  Container,
  BookInfoContainer,
  BookInfoPara,
  BookInfoDetails
} from './bookDetailPageStyle'

// Book page with book information, sellers/listings, and reviews of that book
const BookDetailPage = () => {
  const { isbn } = useParams()
  const {response: book, error, isLoading} = useAsync(() => getBook(isbn), [isbn])

  console.log('BDP rerender')

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

// Primary component of page - Includes image, information about the book, and buttons for admins
const BookInfo = ({ book }) => {
  const history = useHistory()
  const profile = useCurrentProfile()

  const deleteButtonHandler = () => {
    if (confirm('Are you sure you would like to delete ' + book?.title + '? THIS ACTION CANNOT BE REVERSED!'))
      deleteBook(book.isbn)
        .then(history.push('/'))
  }

  return (
    <BookInfoContainer>
      <BookSummary book={book} showLink={false}/>
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
        {profile?.type === 'ADMIN' && <>
          <Button as={Link} to={`/book/edit/${book?.isbn}`}>Edit Book</Button>
          <Button onClick={() => deleteButtonHandler()}>Delete Book</Button>
        </>}
      </div>
    </BookInfoContainer>
  )
}

export default BookDetailPage
