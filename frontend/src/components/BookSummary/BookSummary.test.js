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
  render(wrapWithRouter(<BookSummary book={testBook} />))
  expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(testBook.title)
})

it('Renders Book author', () => {
  render(wrapWithRouter(<BookSummary book={testBook} />))
  expect(screen.getByRole('heading', { level: 3 }).textContent).toBe(testBook.author)
})

it('Renders a link if showLink is set', () => {
  render(wrapWithRouter(<BookSummary book={testBook} showLink={true} />))
  expect(screen.queryByRole('link')).toBeTruthy()
  expect(screen.queryByRole('link').href).toMatch(testBook.isbn)
})

it('Doesn\'t render a link if showLink is not set', () => {
  render(wrapWithRouter(<BookSummary book={testBook} showLink={false} />))
  expect(screen.queryByRole('link')).toBeFalsy()
})
