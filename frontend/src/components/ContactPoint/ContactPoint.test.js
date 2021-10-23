import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ContactPoint from './ContactPoint'


it('Renders only if contactType is specified', () => {
  render(<ContactPoint />)
  expect(screen.getByText('Invalid Contact Type')).toBeTruthy()
})

it('Renders the correct envelope information', () => {
  const { container } = render(<ContactPoint contactType='envelope' />)
  expect(container.querySelector('span')).toBeTruthy()
  expect(container.querySelector('span').textContent).toMatch(/.*@.*/)
})

it('Renders the correct phone information', () => {
  const { container } = render(<ContactPoint contactType='phone' />)
  expect(container.querySelector('span')).toBeTruthy()
  expect(container.querySelector('span').textContent).toMatch(/\+\d{2}\s\d{4}\s\d{3}\s\d{3}/)
})

it('Renders the correct facebook information', () => {
  const { container } = render(<ContactPoint contactType='facebook' />)
  expect(container.querySelector('span')).toBeTruthy()
  expect(container.querySelector('span').textContent).toMatch(/facebook.com\/.*/)
})

it('Renders the correct twitter information', () => {
  const { container } = render(<ContactPoint contactType='twitter' />)
  expect(container.querySelector('span')).toBeTruthy()
  expect(container.querySelector('span').textContent).toMatch(/@.*/)
})

it('Renders the correct instagram information', () => {
  const { container } = render(<ContactPoint contactType='instagram' />)
  expect(container.querySelector('span')).toBeTruthy()
  expect(container.querySelector('span').textContent).toMatch(/@.*/)
})
