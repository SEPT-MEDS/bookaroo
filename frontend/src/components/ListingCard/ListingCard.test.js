import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import { wrapWithRouter } from 'utils'
import ListingCard from './ListingCard'
import { useCurrentProfile } from 'hooks'
import { getUser, getBook } from 'services'

const testListing = {
  id: 132,
  price: 10,
  imageUrl: 'image',
  isPreowned: false,
  isSwap: false,
  bookIsbn: '0'.repeat(13),
  sellerId: 0,
  onDelete: () => {}
}

// Mock current user
jest.mock('hooks/useCurrentProfile', () => jest.fn())
useCurrentProfile.mockReturnValue({ type: 'CUSTOMER' })

// Mock getting book
jest.mock('services/book', () => ({ getBook: jest.fn() }))
getBook.mockResolvedValue({ title: 'BookTitle', author: 'BookAuthor', rating: 3 })

// Mock getting user
jest.mock('services/user', () => ({ getUser: jest.fn() }))

// Mock deleteing listing
jest.mock('services/listing', () => ({ removeListing: jest.fn() }))


it('Renders a link to listing', () => {
  render(wrapWithRouter(<ListingCard {...testListing} />))
  expect(screen.getByRole('link').href).toMatch(String(testListing.id))
})

it('Renders "this is a swap" for swap listings', () => {
  render(wrapWithRouter(<ListingCard {...{...testListing, isSwap: true}} />))
  expect(screen.queryByText('listing is a swap', { exact: false })).toBeTruthy()
})

it('Doesn\'t render "this is a swap" for non-swap listings', () => {
  render(wrapWithRouter(<ListingCard {...{...testListing, isSwap: false}} />))
  expect(screen.queryByText('listing is a swap', { exact: false })).toBeFalsy()
})

it('Renders the price for non-swap listings', () => {
  render(wrapWithRouter(<ListingCard {...{...testListing, isSwap: false}} />))
  expect(screen.queryByText(testListing.price, { exact: false })).toBeTruthy()
})

it('Doesn\'t render the price for swap listings', () => {
  render(wrapWithRouter(<ListingCard {...{...testListing, isSwap: true}} />))
  expect(screen.queryByText(testListing.price, { exact: false })).toBeFalsy()
})

it('Renders "preowned" for pre-owned non-swap listings', () => {
  render(wrapWithRouter(<ListingCard {...{...testListing, isSwap: false, isPreowned: true}} />))
  expect(screen.queryByText('preowned', { exact: false })).toBeTruthy()
})

it('Doesn\'t render "preowned" for new non-swap listings', () => {
  render(wrapWithRouter(<ListingCard {...{...testListing, isSwap: false, isPreowned: false}} />))
  expect(screen.queryByText('preowned', { exact: false })).toBeFalsy()
})

it('Renders "delete" button if owned by current user', async () => {
  const testUserId = 1
  useCurrentProfile.mockReturnValue({ type: 'BUSINESS', id: testUserId })
  getUser.mockResolvedValue({ type: 'BUSINESS', id: testUserId })
  render(wrapWithRouter(<ListingCard {...{...testListing, sellerId: testUserId }} />))
  await waitFor(() => {
    expect(screen.queryByRole('button')).toBeTruthy()
  })
})

it('Doesn\'t render "delete" button if not owned by current user', async () => {
  const testUserId = 1
  useCurrentProfile.mockReturnValue({ type: 'BUSINESS', id: testUserId })
  getUser.mockResolvedValue({ type: 'BUSINESS', id: testUserId+1 })
  render(wrapWithRouter(<ListingCard {...{...testListing, sellerId: testUserId+1 }} />))
  await waitFor(() => {
    expect(screen.queryByRole('button')).toBeFalsy()
  })
})
