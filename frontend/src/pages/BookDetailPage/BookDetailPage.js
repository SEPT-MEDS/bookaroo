import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Spinner, Notification } from '../../components'
import { getBook } from '../../services'

import {
  Container,
  BookInfoContainer,
  BookSellersContainer,
  BookInfoPara,
  BookInfoCover,
  BookInfoAuthor,
  BookInfoDetails
} from './bookDetailPageStyle'

const BookDetailPage = () => {
  const { isbn } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [book, setBook] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    setIsLoading(true)
    getBook(isbn)
      .then(book => setBook(book))
      .then(() => setIsLoading(false))
      .catch(err => {
        setIsLoading(false)
        setError(err.message)
      })
  }, [isbn])

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

const BookSellers = ({ book }) => {
  return <BookSellersContainer>
    <h2>Sellers of <em>{book.title}</em></h2>
  </BookSellersContainer>
}

const BookInfo = ({ book }) => {
  return (
    <BookInfoContainer>
      <div>
        <BookInfoCover />
        <h1>{book.title}</h1>
        <BookInfoAuthor>{book.author}</BookInfoAuthor>
        <span>
          {book.rating}
          {/* wip */}
        </span>
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
