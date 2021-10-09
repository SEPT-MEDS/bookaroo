import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAsync, useCurrentProfile } from 'hooks'
import { ListingCard, Spinner, Notification, Button } from 'components'
import { getBookListings } from 'services'
import { BookSellersContainer } from './bookDetailPageStyle'

// Component to list sellers of a particular book
const BookSellers = ({ book }) => {
  const [isValid, setIsValid] = useState(false)

  // Get listings from backend
  const { response: listings, error, isLoading } = useAsync(() =>
    getBookListings(book.isbn)
      .then(listings => {setIsValid(true); return listings})
  , [isValid, book])

  // Sort listings into preowned and not preowned
  const sortedListings = useMemo(
    () => listings?.sort((a, b) => +a.isPreowned - +b.isPreowned),
    [listings]
  )

  const profile = useCurrentProfile()

  return (
    <BookSellersContainer>
      {/* Sellers of <book title> */}
      <h2>
        Sellers of <em>{book.title}</em>
        {/* Create new listing button if the user is not an admin */}
        {profile?.type !== 'ADMIN' &&
          <Button as={Link} to={`/listing/new/${book.isbn}`}>Create a Listing</Button>}
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
                <ListingCard {...listing} cardStyle={ListingCard.VENDOR_FOCUS} key={listing.id} onDelete={() => setIsValid(false)}/>
              ))
              : <h3><em>No current sellers</em></h3>}
          </>
        )}
      </div>
    </BookSellersContainer>
  )
}

export default BookSellers
