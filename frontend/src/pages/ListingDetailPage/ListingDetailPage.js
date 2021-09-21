import React from 'react'
import { useParams } from 'react-router-dom'

import { useAsync } from 'hooks'
import { getListing, getBook, getUser } from 'services'
import { Notification, Spinner, BookSummary, Rating} from 'components'
import { Container, ListingInfoContainer, ActionBox } from './listingDetailPageStyle'

import { PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js'

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
    console.log('Add listing', id, 'to cart')
  }
  console.log(handleAddToCart)

  
  // For a list of options:
  // https://developer.paypal.com/docs/business/javascript-sdk/javascript-sdk-configuration/
  const initialOptions = {
    // The REST API ID; determines where the funds will be paid to
    'client-id': 'AZ3bA7tCRrgjEKtw8kKPnOBP6TY3kVdLLo0pkuVWWSgTUGAZdEUf1mCbl99eKk1fJcS7P3RyffFs9Eei',
    'currency': 'AUD',
    // intent 'authorize' will allow us to take the funds out at a later time (i.e. pending)
    'intent': 'capture',

    // the merchant for whom you are facilitating a transaction - used for sellers?
    // 'merchant-id': 'AZ3bA7tCRrgjEKtw8kKPnOBP6TY3kVdLLo0pkuVWWSgTUGAZdEUf1mCbl99eKk1fJcS7P3RyffFs9Eei',
    
    // 'data-client-token': 'AZ3bA7tCRrgjEKtw8kKPnOBP6TY3kVdLLo0pkuVWWSgTUGAZdEUf1mCbl99eKk1fJcS7P3RyffFs9Eei',

    // disable card payments
    'disable-funding': 'card'
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


        <PayPalScriptProvider options={ initialOptions }>
          <PayPalButtons className='paypal-button' forceReRender={13.30} style={{
            layout: 'vertical',
            color: 'black',
            // color: '#3552B7',
            // color: '$(p.theme.primary)',
            height: 40,
            shape: 'pill',
            label: 'paypal',
            tagline: false
          }} />
        </PayPalScriptProvider>

      </ActionBox>
    </div>
  </ListingInfoContainer>
}

export default ListingDetailPage
