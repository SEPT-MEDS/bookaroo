import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'

import { useAsync, useCurrentProfile } from 'hooks'
import { ListingCard, Spinner, Notification, Button } from 'components'
import { getBookListings } from 'services'
import { BookSellersContainer } from './bookDetailPageStyle'

// Component to list sellers of a particular book
const BookSellers = ({ book }) => {
  const { response: listings, error, isLoading } = useAsync(() =>
    getBookListings(book.isbn)
  )

  const sortedListings = useMemo(
    () => listings?.sort((a, b) => +a.isPreowned - +b.isPreowned),
    [listings]
  )

  const history = useHistory()
  const handleNewListing = isbn => {
    history.push(`/listing/new/${isbn}`)
  }

  const profile = useCurrentProfile()

  return (
    <BookSellersContainer>
      {/* Sellers of <book title> */}
      <h2>
        Sellers of <em>{book.title}</em>
        {/* Create new listing button if the user is not an admin */}
        {profile?.type !== 'ADMIN' &&
          <Button onClick={() => handleNewListing(book.isbn)} >Create a Listing</Button>}
      </h2>
      <div>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {error && <Notification isError={true}>{error}</Notification>}
            {/* Put all listings for current book into ListingCard components */}
            {listings?.length
              ? sortedListings.map(listing => (
                <ListingCard {...listing} cardStyle={ListingCard.VENDOR_FOCUS} key={listing.id} />
              ))
              : <h3><em>No current sellers</em></h3>}
          </>
        )}
      </div>
    </BookSellersContainer>
  )
}

export default BookSellers
