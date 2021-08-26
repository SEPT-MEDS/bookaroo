import React from 'react'

import { Container } from './bookGridStyle'
import { BookCard } from '../../components'

const BookGrid = ({ books }) => (
  <Container>
    {books ? (
      books.map(book => <BookCard key={book?.title} {...book} />)
    ) : (
      <span>No Books</span>
    )}
  </Container>
)

export default BookGrid
