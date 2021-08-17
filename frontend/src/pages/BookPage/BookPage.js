import React, { useState, useEffect } from 'react'

import { Container } from './bookPageStyle'
import { BookCard } from '../../components'

const BookPage = () => {
  const [books, ] = useState([{}, {}])

  useEffect(() => {
    // fetch books from backend and then call setBooks()
  })

  return <Container>
    { books.map(book => <BookCard key={book?.title} />) }
  </Container>
}

export default BookPage
