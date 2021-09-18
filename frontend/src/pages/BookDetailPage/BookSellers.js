import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { useAsync } from 'hooks'
import { getUser } from 'services'
import { Rating, Spinner, Notification } from 'components'
import { getBookListings } from 'services'
import { BookSellersContainer, ListingContainer } from './bookDetailPageStyle'

const BookSellers = ({ book }) => {
  const { response: listings, error, isLoading } = useAsync(() =>
    getBookListings(book.isbn)
  )

  const sortedListings = useMemo(
    () => listings?.sort((a, b) => +a.isPreowned - +b.isPreowned),
    [listings]
  )

  return (
    <BookSellersContainer>
      <h2>
        Sellers of <em>{book.title}</em>
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
                <Listing {...listing} key={listing.id} />
              ))}
          </>
        )}
      </div>
    </BookSellersContainer>
  )
}

const Listing = ({ id, sellerId, price, imageUrl, isPreowned, isSwap }) => {
  const { response: vendor } = useAsync(() => getUser(sellerId))

  return (
    <ListingContainer>
      <div style={{ backgroundImage: `url(${imageUrl})` }} />
      <div>
        <h3>
          <Link to={`/listing/${id}`}>
            {vendor ? `${vendor.firstName} ${vendor.lastName}` : 'Vendor'}
          </Link>
        </h3>
        <Rating rating={3 /* TO DO */} />
        {isSwap && <div><em>This listing is a swap</em></div>}
        {!isSwap && <div>{`$${price}`} {isPreowned && <em> (preowned)</em>}</div>}
      </div>
    </ListingContainer>
  )
}

export default BookSellers
