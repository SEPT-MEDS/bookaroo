import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { useAsync, useCurrentProfile } from 'hooks'
import { getListing, getBook, getUser } from 'services'
import { Button, Notification, Spinner, BookSummary, Rating, UserReviews, Price } from 'components'

import PurchaseSuccess from './PurchaseSuccess'
import PurchaseButton from './PurchaseButton'
import { Container, ListingInfoContainer, ActionBox, UserLink, RatingContainer } from './listingDetailPageStyle'

// Listing page from a particular seller - Accessed after clicking a listing from a book page
const ListingDetailPage = () => {
  const { id } = useParams()
  const { response: listing, error, isLoading } = useAsync(() => getListing(id), [id])
  
  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {error && <Notification isError={true}>{error}</Notification>}
          {listing && <ListingInfo {...listing} />}
        </>
      )}
    </Container>
  )
}

// Display information regarding the particular listing
const ListingInfo = ({ id, sellerId, price, isSwap, imageUrl, isPreowned, bookIsbn }) => {
  const history = useHistory()
  const [purchaseSuccess, setPurchaseSuccess] = useState(false)
  const [purchaseError, setPurchaseError] = useState()
  const { response: vendor } = useAsync(() => getUser(sellerId))
  const { response: book } = useAsync(() => getBook(bookIsbn))
  const profile = useCurrentProfile()

  // If the purchase was succesfull we show the success info instead
  if (purchaseSuccess) {
    return <PurchaseSuccess {...{id, bookIsbn, sellerId, price, imageUrl}}/>
  }

  // Redirect to user page when press 'contact' on a swap listing
  const handleContact = () => {
    history.push(`/user/${sellerId}#contact`)
  }

  return <ListingInfoContainer>
    <BookSummary book={book} imageUrl={imageUrl} />
    <div>
      {/* Name and link to user profile */}
      <h3><em>Listing by</em></h3>
      <h1><UserLink to={`/user/${vendor?.id}`}>{ vendor?.username || 'Vendor' }</UserLink></h1>
      <RatingContainer><Rating rating={vendor?.rating || 0} /></RatingContainer>
      
      {/* Describe status of listing (e.g. condition, is swap, price) */}
      {vendor?.id === profile?.id
        ? <ActionBox><h3>This is your listing</h3></ActionBox>
        : (profile.type !== 'ADMIN' &&
          <ActionBox>
            {isSwap
              ? <h3>Swap with <em>vendor?.username</em> for another book</h3>
              : <h3>Buy {isPreowned ? 'preowned' : 'brand new'} for <Price price={price} /></h3>}

            {purchaseError && <Notification isError={true}>{String(purchaseError)}</Notification>}
            {isSwap
              ? <Button onClick={handleContact}> Contact Seller </Button>
              : <PurchaseButton
                listingId={id}
                price={price}
                onPurchase={() => setPurchaseSuccess(true)}
                onError={err => setPurchaseError(err)} />}
          </ActionBox>
        )}
    </div>

    {/* Reviews of user selling book */}
    <div className='reviews'>
      {vendor && <UserReviews user={vendor} />}
    </div>
  </ListingInfoContainer>
}

export default ListingDetailPage
