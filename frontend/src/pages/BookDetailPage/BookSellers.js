import React from 'react'

import { useAsync } from 'hooks'
import { getUser } from 'services'
import { Rating, Spinner, Notification } from 'components'
import { getBookListings } from 'services'
import { BookSellersContainer } from './bookDetailPageStyle'

const BookSellers = ({ book }) => {
  const { response: listings, error, isLoading } = useAsync(() =>
    getBookListings(book.isbn)
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
            {listings &&
              listings.map(listing => (
                <Listing {...listing} key={listing.id} />
              ))}
          </>
        )}
      </div>
    </BookSellersContainer>
  )
}

const Listing = ({ sellerId, price }) => {
  const { response: vendor } = useAsync(() => getUser(sellerId))

  return (
    <div>
      {vendor && `${vendor.firstName} ${vendor.lastName}`}
      <Rating rating={3 /* TO DO */} />
      {`$${price}`}
    </div>
  )
}

export default BookSellers
