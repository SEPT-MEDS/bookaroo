import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import useCurrentProfile from 'hooks/useCurrentProfile'

import Navigation from './Navigation'

// Mock useCurrentProfile to control logged in user type
jest.mock('hooks/useCurrentProfile', () => jest.fn())

it('Renders a navigation', () => {
  const history = createMemoryHistory()
  render(
    <Router history={history}>
      <Navigation />
    </Router>
  )
  expect(screen.queryByRole('navigation')).toBeTruthy()
})

it('Renders "add a book" link for admins', () => {
  const history = createMemoryHistory()
  useCurrentProfile.mockReturnValue({ type: 'ADMIN' })
  render(
    <Router history={history}>
      <Navigation />
    </Router>
  )
  expect(screen.queryByText('Add a book')).toBeTruthy()
  expect(screen.queryByText('Sell a book')).toBeFalsy()
})

it('Renders "Sell a book" link for customers', () => {
  const history = createMemoryHistory()
  useCurrentProfile.mockReturnValue({ type: 'CUSTOMER' })
  render(
    <Router history={history}>
      <Navigation />
    </Router>
  )
  expect(screen.queryByText('Add a book', { exact: false })).toBeFalsy()
  expect(screen.queryByText('Sell a book', { exact: false })).toBeTruthy()
})
