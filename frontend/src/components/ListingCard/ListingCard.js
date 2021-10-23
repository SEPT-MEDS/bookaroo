import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { useAsync, useCurrentProfile } from 'hooks'
import { getBook, getUser, removeListing } from 'services'

import { ListingContainer, DeleteButton, DeleteButtonContainer } from './listingCardStyle'
import { Price, Rating } from 'components'

const CARD_STYLES = {
  'BOOK_FOCUS':0,
  'VENDOR_FOCUS':1
}

// Component used to display a listing
const ListingCard = ({ id, price, imageUrl, isPreowned, isSwap, bookIsbn, sellerId, cardStyle=CARD_STYLES.BOOK_FOCUS, onDelete }) => {
  const { response: book } = useAsync(() => getBook(bookIsbn), [bookIsbn])
  const { response: vendor } = useAsync(() => getUser(sellerId), [sellerId])
  const profile = useCurrentProfile()

  // Determine what to show for title (either vendor name + username or book title)
  const title = cardStyle === CARD_STYLES.BOOK_FOCUS
    ? (book ? book.title : 'Book')
    : (vendor ? `${vendor.firstName} ${vendor.lastName} (${vendor.username})` : 'Vendor')

  // Determine whether rating should be for the book or vendor (person selling the book)
  const rating = cardStyle === CARD_STYLES.BOOK_FOCUS
    ? (book ? book.rating : 0)
    : (vendor ? vendor.rating : 0)

  // Asks for confimation of deletion before removing the listing
  const handleDeleteListing = async () => {
    if (window.confirm('Are you sure you would like to remove your listing? This action cannot be undone.')) {
      await removeListing(id)
      if (onDelete) onDelete()
    }
  }

  return (
    <ListingContainer>
      {/* Image */}
      <div style={{ backgroundImage: `url(${imageUrl})` }} />
      {/* General information */}
      <div>
        {/* Link to listing */}
        <h3>
          <Link to={`/listing/${id}`}>{title}</Link>
        </h3>
        {/* Rating */}
        <Rating rating={rating} />
        {/* Attributes of book (e.g. is swap, price, condition) */}
        {isSwap && (
          <div>
            <em>This listing is a swap</em>
          </div>
        )}
        {!isSwap && (
          <div>
            <Price price={price}/>{isPreowned && <em> (preowned)</em>}
          </div>
        )}
      </div>
      {/* Delete button (only displayed if the listing is owned by the current user) */}
      <DeleteButtonContainer>
        {profile && vendor?.id === profile?.id && 
          <DeleteButton onClick={() => handleDeleteListing(book)}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </DeleteButton>}
      </DeleteButtonContainer>
    </ListingContainer>
  )
}

// Store card styled enum on ListingCard component
ListingCard.BOOK_FOCUS = CARD_STYLES.BOOK_FOCUS
ListingCard.VENDOR_FOCUS = CARD_STYLES.VENDOR_FOCUS

export default ListingCard


