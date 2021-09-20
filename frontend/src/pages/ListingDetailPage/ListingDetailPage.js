import React from 'react'
import ReactDOM from 'react-dom'
import { useParams } from 'react-router-dom'

import { useAsync } from 'hooks'
import { getListing, getBook, getUser } from 'services'
import { Notification, Spinner, BookSummary, Rating/*, Button*/} from 'components'
import { Container, ListingInfoContainer, ActionBox } from './listingDetailPageStyle'

const PayPalButton = window.paypal.Buttons.driver('react', { React, ReactDOM })

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

const ListingInfo = ({ id, sellerId, price, isSwap, imageUrl, isPreowned, bookIsbn }) => {
  const { response: vendor } = useAsync(() => getUser(sellerId))
  const { response: book } = useAsync(() => getBook(bookIsbn))

  const handleAddToCart = () => {
    // TODO
    
    // const createOrder = (data, actions) => {
    //   return actions.order.create({
    //     purchase_units: [
    //       {
    //         amount: {
    //           value: '15.30'
    //         }
    //       }
    //     ]
    //   })
    // }
    
    // const onApprove = (data, actions) => {
    //   console.log('ORDER COMPLETE')
    //   return actions.order.capture()
    // }
    
    
    console.log('Add listing', id, 'to cart')
    
    // return (
    //   <PayPalButton
    //     createOrder={(data, actions) => createOrder(data, actions)}
    //     onApprove={(data, actions) => onApprove(data, actions)}
    //   />
    // )

    // <script src="https://www.paypal.com/sdk/js?client-id=AZ3bA7tCRrgjEKtw8kKPnOBP6TY3kVdLLo0pkuVWWSgTUGAZdEUf1mCbl99eKk1fJcS7P3RyffFs9Eei"></script>
    // <script>paypal.Buttons().render('body');</script>
  }
  console.log(handleAddToCart)



  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            // Order total (use variable for price/cart total)
            value: '15.30'
          }
        }
      ]
    })
  }

  const onApprove = (data, actions) => {
    return actions.order.capture()
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
        <PayPalButton
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
        />

        {/* <Button onClick={handleAddToCart}>{isSwap ? `Contact ${vendor?.username || 'seller'}` : 'Buy Now'}</Button> */}
      </ActionBox>
    </div>
  </ListingInfoContainer>
}

export default ListingDetailPage
