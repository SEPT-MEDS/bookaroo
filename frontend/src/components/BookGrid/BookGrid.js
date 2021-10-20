import React from 'react'

import { Container } from './bookGridStyle'
import { BookCard } from '../../components'

// Grid of books as used by the primary book page
const BookGrid = ({ books }) => (
  <Container>
    {/* Map each of the books to its own card if there are books */}
    {books?.length ? (
      books.map(book => <BookCard key={book?.isbn} {...book} />)
    ) : (
      // Display to the user that there are no books(if there are no books)
      <span>No Books</span>
    )}
  </Container>
)

export default BookGrid
