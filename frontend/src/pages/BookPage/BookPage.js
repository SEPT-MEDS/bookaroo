import React, { useState, useEffect } from 'react'

import { BookGrid, Spinner } from '../../components'
import { getAllBooks } from '../../services'

import { Container } from './bookPageStyle'


const BookPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [books, setBooks] = useState()

  useEffect(() => {
    setIsLoading(true)
    getAllBooks()
      .then(books => setBooks(books))
      .then(() => setIsLoading(false))
  }, [])

  return <Container>
    { isLoading ? <Spinner /> : <BookGrid books={books}/> }
  </Container>
}

export default BookPage
