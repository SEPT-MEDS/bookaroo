import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Spinner } from '../../components'
import { getBook } from '../../services'

const BookDetailPage = () => {
  const { isbn } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [book, setBook] = useState()

  useEffect(() => {
    setIsLoading(true)
    getBook(isbn)
      .then(book => setBook(book))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false))
  }, [isbn])

  return <div>
    {isLoading
      ? <Spinner />
      : (book ? <BookInfo book={book} /> : <span>{'problemo :{'}</span>)
    }
  </div>
}

const BookInfo = ({ book }) => {
  return <div>
    <h2>title: {book.title}</h2>
    <h3>author: {book.author}</h3>
    <code>
      {JSON.stringify(book, null, '\n')}
    </code>
  </div>
}

export default BookDetailPage
