import React from 'react'
import { useParams } from 'react-router-dom'

import { useAsync } from 'hooks'
import { getListing, getBook, getUser } from 'services'
import { Notification, Spinner, BookSummary, Rating} from 'components'

import PurchaseButton from './PurchaseButton'
import { Container, ListingInfoContainer, ActionBox } from './listingDetailPageStyle'

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
  const { response: vendor } = useAsync(() => getUser(sellerId))
  const { response: book } = useAsync(() => getBook(bookIsbn))

  return <ListingInfoContainer>
    <BookSummary book={book} imageUrl={imageUrl} />
    <div>
      <h4><em>Listing by</em></h4>
      <h1>{ vendor?.username || 'Vendor' }</h1>
      <Rating rating={vendor?.rating || 0} />
      <ActionBox>
        {!isSwap && <h3>Buy {isPreowned ? 'preowned' : 'brand new'} for ${ price }</h3>}
        {isSwap && <h3>Swap with <em>{vendor?.username}</em> for another book</h3>}
        <PurchaseButton listingId={id} price={price} redirect={`/book/${bookIsbn}`} />
      </ActionBox>
    </div>
  </ListingInfoContainer>
}

export default ListingDetailPage
