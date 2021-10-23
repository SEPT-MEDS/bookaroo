import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Price from './Price'


it('Renders the price', () => {
  const price = 15
  render(<Price price={price} />)
  expect(screen.getByText(price, { exact: false })).toBeTruthy()
})

it('Formats small prices correctly', () => {
  const price = 15
  render(<Price price={price} />)
  expect(screen.getByText('$', { exact: false }).textContent).toMatch(/.*\$[0-9.]+/)
})

it('Formats large prices correctly', () => {
  const price = 1500
  render(<Price price={price} />)
  expect(screen.getByText('$', { exact: false }).textContent).toMatch(/.*\$[0-9.,]+/)
})

it('Requires the price prop', () => {
  const {container} = render(<Price />)
  expect(container.querySelector('span')).toBeFalsy()
})
