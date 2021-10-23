import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Logo from './Logo'


it('Renders the site name', () => {
  render(<Logo />)
  expect(screen.getByText('Bookaroo')).toBeTruthy()
})

it('Renders a heading', () => {
  render(<Logo />)
  expect(screen.getByRole('heading')).toBeTruthy()
})

it('Renders a styled heading', () => {
  render(<Logo />)
  expect(screen.getByRole('heading').className).toBeTruthy()
})

