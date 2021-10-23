import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { wrapWithRouter } from 'utils'
import BookSummary from './BookSummary'

// Create a test book
const testBook = {
  title: 'Title',
  author: 'Author',
  rating: 3,
  isbn: '1234567890123'
}


it('Renders Book title', () => {
  const { container } = render(wrapWithRouter(<BookSummary book={testBook} />))
  expect(screen.getByRole('heading').textContent).toBe(testBook.title)
})

