import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { wrapWithRouter } from 'utils'
import BookGrid from './BookGrid'

// Create a test book
const testBook = {
  title: 'Title',
  author: 'Author',
  rating: 3,
  isbn: '1234567890123'
}

// Create an array of test books with different valid isbns
const testBooks = Array(10)
  .fill(testBook)
  .map((b, i) => ({ ...b, isbn: `${i}`.repeat(13) }))


it('Renders "No Books" if empty', () => {
  const { container } = render(<BookGrid books={[]} />)
  expect(screen.queryByText('No Books', { exact: false })).toBeTruthy()
  expect(container.firstChild.children).toHaveLength(1)
})

it('Renders the correct amount of books', () => {
  const { container } = render(wrapWithRouter(<BookGrid books={testBooks} />))
  expect(container.firstChild.children).toHaveLength(testBooks.length)
})
