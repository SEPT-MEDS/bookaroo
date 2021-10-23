import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import useCurrentProfile from 'hooks/useCurrentProfile'
import { wrapWithRouter } from 'utils'
import Navigation from './Navigation'


// Mock useCurrentProfile to control logged in user type
jest.mock('hooks/useCurrentProfile', () => jest.fn())

it('Renders a navigation', () => {
  render(wrapWithRouter(<Navigation />))
  expect(screen.queryByRole('navigation')).toBeTruthy()
})

it('Renders "add a book" link for admins', () => {
  useCurrentProfile.mockReturnValue({ type: 'ADMIN' })
  render(wrapWithRouter(<Navigation />))
  expect(screen.queryByText('Add a book')).toBeTruthy()
  expect(screen.queryByText('Sell a book')).toBeFalsy()
})

it('Renders "Sell a book" link for customers', () => {
  useCurrentProfile.mockReturnValue({ type: 'CUSTOMER' })
  render(wrapWithRouter(<Navigation />))
  expect(screen.queryByText('Add a book', { exact: false })).toBeFalsy()
  expect(screen.queryByText('Sell a book', { exact: false })).toBeTruthy()
})
