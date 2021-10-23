import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import BookCover from './BookCover'

const testISBN = '000000000000'
const testImageUrl = 'test'

it('Uses imageUrl when provided', () => {
  const { container } = render(<BookCover isbn={testISBN} imageUrl={testImageUrl} />)
  expect(container.firstChild.style.backgroundImage).toMatch(testImageUrl)
})

it('Queries public api using ISBN if imageUrl not provided', () => {
  const { container } = render(<BookCover isbn={testISBN} />)
  expect(container.firstChild.style.backgroundImage).toMatch(testISBN)
})
