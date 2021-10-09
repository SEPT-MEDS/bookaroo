import React, { useState, useEffect } from 'react'

import { BookGrid, Spinner } from 'components'
import { getAllBooks } from 'services'
import { useDebounce } from 'hooks'

import { Container, ControlsContainer, CatSelectContainer, SearchBar } from './bookPageStyle'

// Main book page
const BookPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState('')
  const debouncedFilter = useDebounce(filter, 300)
  const [books, setBooks] = useState()
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])

  // Extract distinct categories from all books
  useEffect(() => {
    getAllBooks().then(books => {
      const categories = !books
        ? []
        : books
          .map(b => b.category)
          .filter(x => x)
          .reduce((a, b) => (a.includes(b) ? a : [...a, b]), [])
      setCategories(['All', ...categories])
      setCategory('All')
    })
  }, [])

  // Filter books according to search bar filter and category 
  useEffect(() => {
    setIsLoading(true)
    getAllBooks(debouncedFilter, category !== 'All' && category)
      .then(books => setBooks(books))
      .then(() => setIsLoading(false))
  }, [debouncedFilter, category])

  return (
    <Container>
      <ControlsContainer>
        {/* Search bar */}
        <SearchBar
          placeholder="Search for a book"
          value={filter}
          onChange={({ target: { value } }) => setFilter(value)}
        />
        
        {/* Category selector (dropdown box) */}
        <CatSelectContainer>
          <label htmlFor='category'>Category</label>
          <select
            name='category'
            value={category}
            onChange={({ target: { value } }) => setCategory(value)}
          >
            {categories.map(c => (
              <option value={c} key={c}>
                {c}
              </option>
            ))}
          </select>
        </CatSelectContainer>
      </ControlsContainer>
      {/* Grid of books */}
      {isLoading ? <Spinner /> : <BookGrid books={books} />}
    </Container>
  )
}

export default BookPage
