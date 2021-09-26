import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { useAsync } from 'hooks'
import { getListing, getBook, getUser } from 'services'
import { Button, Notification, Spinner, BookSummary, Rating} from 'components'

import PurchaseSuccess from './PurchaseSuccess'
import PurchaseButton from './PurchaseButton'
import { Container, ListingInfoContainer, ActionBox } from './listingDetailPageStyle'
import UserReviews from './UserReviews'

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

const ListingInfo = ({ id, sellerId, price, isSwap, imageUrl, isPreowned, bookIsbn }) => {
  const history = useHistory()
  const [purchaseSuccess, setPurchaseSuccess] = useState(false)
  const [purchaseError, setPurchaseError] = useState()
  const { response: vendor } = useAsync(() => getUser(sellerId))
  const { response: book } = useAsync(() => getBook(bookIsbn))

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
      <h4><em>Listing by</em></h4>
      <h1>{ vendor?.username || 'Vendor' }</h1>
      <Rating rating={vendor?.rating || 0} />
      <ActionBox>
        {!isSwap && <h3>Buy {isPreowned ? 'preowned' : 'brand new'} for ${ price }</h3>}
        {isSwap && <h3>Swap with <em>{vendor?.username}</em> for another book</h3>}
        {purchaseError && <Notification isError={true}>{String(purchaseError)}</Notification>}
        {!isSwap && <PurchaseButton
          listingId={id}
          price={price}
          onPurchase={() => setPurchaseSuccess(true)}
          onError={err => setPurchaseError(err)} />}
        {isSwap && <Button onClick={handleContact}> Contact Seller </Button>}
      </ActionBox>
    </div>
    <div className='reviews'>
      {vendor && <UserReviews user={vendor} />}
    </div>
  </ListingInfoContainer>
}

export default ListingDetailPage
