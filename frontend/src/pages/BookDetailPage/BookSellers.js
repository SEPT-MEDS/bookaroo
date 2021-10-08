import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'

import { useAsync, useCurrentProfile } from 'hooks'
import { ListingCard, Spinner, Notification, Button } from 'components'
import { getBookListings } from 'services'
import { BookSellersContainer } from './bookDetailPageStyle'

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
      <h2>
        Sellers of <em>{book.title}</em> {profile?.type !== 'ADMIN' &&
          <Button onClick={() => handleNewListing(book.isbn)} >Create a Listing</Button>}
      </h2>
      <div>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {error && <Notification isError={true}>{error}</Notification>}
            {!listings?.length && (
              <h3>
                <em>No current sellers</em>
              </h3>
            )}
            {listings?.length > 0 &&
              sortedListings.map(listing => (
                <ListingCard {...listing} cardStyle={ListingCard.VENDOR_FOCUS} key={listing.id} />
              ))}
          </>
        )}
      </div>
    </BookSellersContainer>
  )
}

export default BookSellers
