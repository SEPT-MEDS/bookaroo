import React from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { Spinner, Notification, BookSummary, Button } from 'components'
import { deleteBook, getBook, patchBook } from 'services'
import { useAsync, useCurrentProfile } from 'hooks'

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
  const history = useHistory()
  const editButtonHandler = () => {
    // redirect to edit page
    history.push(`/book/edit/${book.isbn}`)
    console.log('Editing ' + book.title)
    console.log(book)
    console.log(book.numPages += 1)
    console.log(book)
    patchBook(book.isbn, {book})
  }

  const deleteButtonHandler = () => {
    if (confirm('Are you sure you would like to delete ' + book?.title + '? THIS ACTION CANNOT BE REVERSED!'))
      deleteBook(book.isbn)
        .then(history.push('/'))
  }

  const profile = useCurrentProfile()
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
        {profile && profile.type === 'ADMIN' && <>
          <Button onClick={() => editButtonHandler()}>Edit Book</Button>
          <Button onClick={() => deleteButtonHandler()}>Delete Book</Button>
        </>}
      </div>
    </BookInfoContainer>
  )
}

export default BookDetailPage
