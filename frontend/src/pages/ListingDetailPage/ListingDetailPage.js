import React from 'react'
import { useParams } from 'react-router-dom'

import { useAsync } from 'hooks'
import { getListing, getBook, getUser } from 'services'
import { Notification, Spinner, BookInfo, Rating } from 'components'
import { Container, ListingInfoContainer } from './listingDetailPageStyle'

const ListingDetailPage = () => {
  const { id } = useParams()
  const {response: listing, error, isLoading} = useAsync(() => getListing(id), [id])
  
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

const ListingInfo = ({ id, sellerId, price, imageUrl, isPreowned, bookIsbn }) => {
  const { response: vendor } = useAsync(() => getUser(sellerId))
  const { response: book } = useAsync(() => getBook(bookIsbn))

  const handleAddToCart = () => {
    // TODO
    console.log('Add listing', id, 'to cart')
  }

  return <ListingInfoContainer>
    {book && <BookInfo book={book} imageUrl={imageUrl} />}
    <div>
      <h2>{ vendor?.username || 'Vendor' }</h2>
      <h3>${ price }</h3>
      {vendor && <Rating rating={vendor.rating} />}
      <h3>{isPreowned ? 'Preowned' : 'Brand New'}</h3>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  </ListingInfoContainer>
}

export default ListingDetailPage