import React, { useState, useEffect } from 'react'

import { BookGrid, Spinner } from 'components'
import { getAllBooks } from 'services'
import { useDebounce } from 'hooks'

import { Container, ControlsContainer, CatSelectContainer, SearchBar } from './bookPageStyle'

const BookPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState('')
  const debouncedFilter = useDebounce(filter, 300)
  const [books, setBooks] = useState()
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])

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

  useEffect(() => {
    setIsLoading(true)
    getAllBooks(debouncedFilter, category !== 'All' && category)
      .then(books => setBooks(books))
      .then(() => setIsLoading(false))
  }, [debouncedFilter, category])

  return (
    <Container>
      <ControlsContainer>
        <SearchBar
          placeholder="Search for a book"
          value={filter}
          onChange={({ target: { value } }) => setFilter(value)}
        />
        
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
      {isLoading ? <Spinner /> : <BookGrid books={books} />}
    </Container>
  )
}

export default BookPage
