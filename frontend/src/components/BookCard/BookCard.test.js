import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { wrapWithRouter } from 'utils'

import BookCard from './BookCard'

const testBook = {
  title: 'TestTitle',
  author: 'TestAuthor',
  rating: 3,
  isbn: '0000000000000',
  url: ''
}

it('Renders a link to the book', () => {
  render(wrapWithRouter(<BookCard {...testBook} />))
  expect(screen.getByRole('link').href).toMatch(`/book/${testBook.isbn}`)
})

it('Renders a cover image', () => {
  render(wrapWithRouter(<BookCard {...testBook} />))
  expect(screen.getByRole('link').href).toMatch(`/book/${testBook.isbn}`)
})

it('Renders the books title as a heading', () => {
  render(wrapWithRouter(<BookCard {...testBook} />))
  expect(screen.getByRole('heading', { level: 2 }).textContent).toMatch(testBook.title)
})

it('Renders the books author', () => {
  render(wrapWithRouter(<BookCard {...testBook} />))
  expect(screen.queryByText(testBook.author)).toBeTruthy()
})
