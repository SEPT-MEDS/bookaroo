import React, { useState, useEffect } from 'react'

import { BookGrid, Spinner } from 'components'
import { getAllBooks } from 'services'
import { useDebounce } from 'hooks'

import { Container, SearchBar } from './bookPageStyle'

const BookPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState('')
  const debouncedFilter = useDebounce(filter, 300)
  const [books, setBooks] = useState()

  useEffect(() => {
    setIsLoading(true)
    getAllBooks(debouncedFilter)
      .then(books => setBooks(books))
      .then(() => setIsLoading(false))
  }, [debouncedFilter])

  return (
    <Container>
      <SearchBar
        placeholder="Search for a book"
        value={filter}
        onChange={({ target: { value } }) => setFilter(value)}
      />
      {isLoading ? <Spinner /> : <BookGrid books={books} />}
    </Container>
  )
}

export default BookPage
