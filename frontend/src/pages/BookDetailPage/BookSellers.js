import React, { } from 'react'
import { Link } from 'react-router-dom'

import { useAsync, useCurrentProfile } from 'hooks'
import { ListingCard, Spinner, Notification, Button } from 'components'
import { getBookListings } from 'services'
import { BookSellersContainer } from './bookDetailPageStyle'

// Component to list sellers of a particular book
const BookSellers = ({ book }) => {
  const profile = useCurrentProfile()
  const { response: listings, error, isLoading, invalidate } = useAsync(() => getBookListings(book.isbn), [book])

  console.log(listings)

  // Sort listings into preowned and not preowned
  const sortedListings = listings
  // useMemo(
  //   () => listings?.sort((a, b) => +a.isPreowned - +b.isPreowned),
  //   [listings]
  // )

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
                <ListingCard {...listing} cardStyle={ListingCard.VENDOR_FOCUS} key={listing.id} onDelete={invalidate}/>
              ))
              : <h3><em>No current sellers</em></h3>}
          </>
        )}
      </div>
    </BookSellersContainer>
  )
}

export default BookSellers
