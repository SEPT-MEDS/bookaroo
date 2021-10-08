import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { useAsync, useCurrentProfile } from 'hooks'
import { getBook, getUser, removeListing } from 'services'

import { ListingContainer, DeleteButton, DeleteButtonContainer } from './listingCardStyle'
import { Rating } from 'components'

const CARD_STYLES = {
  'BOOK_FOCUS':0,
  'VENDOR_FOCUS':1
}

const Listing = ({ id, price, imageUrl, isPreowned, isSwap, bookIsbn, sellerId, cardStyle=CARD_STYLES.BOOK_FOCUS }) => {
  const { response: book } = useAsync(() => getBook(bookIsbn), [bookIsbn])
  const { response: vendor } = useAsync(() => getUser(sellerId), [sellerId])
  const profile = useCurrentProfile()
  

  // Determine what to show for title (either vendor name + username or book title)
  const title = cardStyle === CARD_STYLES.BOOK_FOCUS
    ? (book ? book.title : 'Book')
    : (vendor ? `${vendor.firstName} ${vendor.lastName} (${vendor.username})` : 'Vendor')

  const rating = cardStyle === CARD_STYLES.BOOK_FOCUS
    ? (book ? book.rating : 0)
    : (vendor ? vendor.rating : 0)

  return (
    <ListingContainer>
      <div style={{ backgroundImage: `url(${imageUrl})` }} />
      <div>
        <h3>
          <Link to={`/listing/${id}`}>{title}</Link>
        </h3>
        <Rating rating={rating} />
        {isSwap && (
          <div>
            <em>This listing is a swap</em>
          </div>
        )}
        {!isSwap && (
          <div>
            {`$${price}`} {isPreowned && <em> (preowned)</em>}
          </div>
        )}
      </div>
      <DeleteButtonContainer>
        {profile && vendor?.id === profile?.id && 
          <DeleteButton onClick={() => removeListing(id)}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </DeleteButton>}
      </DeleteButtonContainer>
    </ListingContainer>
  )
}

Listing.BOOK_FOCUS = CARD_STYLES.BOOK_FOCUS
Listing.VENDOR_FOCUS = CARD_STYLES.VENDOR_FOCUS

export default Listing


