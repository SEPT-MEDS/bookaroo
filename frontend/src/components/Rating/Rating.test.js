import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Rating from './Rating'


it('Renders the correct parenthesised rating', () => {
  const rating = 3
  render(<Rating rating={rating} />)
  expect(screen.queryByText(`(${rating})`, {exact: false})).toBeTruthy()
})

it('Renders the correct number of stars', () => {
  const [rating, maxRating] = [3, 5]
  const { container } = render(<Rating rating={rating} maxRating={maxRating} />)
  expect(container.innerHTML.match(/⭐️/g)).toHaveLength(maxRating)
})

it('Renders the correct number of filled stars', () => {
  const [rating, maxRating] = [3, 5]
  const { container } = render(<Rating rating={rating} maxRating={maxRating} />)
  expect(container.querySelector('.filled').innerHTML.match(/⭐️/g)).toHaveLength(rating)
})

it('Renders the correct number of unfilled stars', () => {
  const [rating, maxRating] = [3, 5]
  const { container } = render(<Rating rating={rating} maxRating={maxRating} />)
  expect(container.querySelector('.unfilled').innerHTML.match(/⭐️/g)).toHaveLength(maxRating - rating)
})
