import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'

import { useCurrentProfile, useAsync } from 'hooks'
import { Button, BookCover, BookSummary, Notification, Price } from 'components'
import { 
  getAllPurchases, 
  getPurchasesBySeller, 
  getPurchasesByBuyer, 
  getBook, 
  getListing,
  getUser,
  cancelPurchase,
} from 'services'

import { Container, TransactionsContainer, TransactionContainer } from './transactionsPageStyle'

const hex = n => Number(n).toString(16).toUpperCase()
const MAX_CANCEL_TIME = 2 /* hrs */ * 60 /* mins */ * 60 /* seconds */ * 1000 /* ms */
const headings = {
  CUSTOMER: 'Order History', 
  BUSINESS: 'Business Transaction History',
  ADMIN: 'Transaction History',
} 

const TransactionsPage = () => {
  const profile = useCurrentProfile()
  const userType = profile?.type
  const [transactions, setTransactions] = useState()
  const [error, setError] = useState()

  // Set a heading based on user type
  const heading = headings[userType] ?? 'Transactions'
  
  // Fetch Transactions based on user type
  useEffect(() => {
    const fetchTransactions = (async () => {
      let request

      // Perform a request for different purchases dependent on user type
      if (userType === 'CUSTOMER') 
        request = getPurchasesByBuyer(profile.id)
      if (userType === 'BUSINESS')
        request = getPurchasesBySeller(profile.id)
      if (userType === 'ADMIN')
        request = getAllPurchases()
        
      // Wait for results and update state
      try {
        setTransactions(await request)
      } catch (err) {
        console.log(err)
        setError(err?.message)
      }
    })

    if (userType) fetchTransactions()
  }, [userType])

  return <Container>
    <h1>{heading}</h1>
    {transactions?.length ?
      <TransactionsContainer>
        {error && <Notification isError={true}>{error}</Notification>}
        {/* Display transactions based on user type */}
        {transactions
          .map((v,i,a) => a[a.length - 1 - i]) // reverse - display most recent on top
          .map(transaction => <Transaction key={transaction.id} userType={userType} {...transaction}/>)}
      </TransactionsContainer> : (
        'There are no transactions'
      )}
  </Container>
}

// Single transaction
const Transaction = ({ id, listingId, purchaseCreationTime, buyerId, sellerId, userType }) => {
  const history = useHistory()
  const { response: listing, error: listingError } = useAsync(() => getListing(listingId), [listingId])
  const { response: book, error: bookError } = useAsync(() => listing && getBook(listing?.bookIsbn), [listing])
  const { response: seller, error: sellerError } = useAsync(() => listing && getUser(listing?.sellerId), [listing])

  // Only can be cancelled if new enough
  const canCancel = (Date.now() - purchaseCreationTime) <= MAX_CANCEL_TIME

  // Handle cancelling
  const handleCancel = () => {
    if (window.confirm('Are you sure? This action cannot be undone.'))
      cancelPurchase(id)
        .then(() => history.go(0))
  }
  const ERROR_BOOK = {
    title: 'Null book',
    url: 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'
  }

  return <TransactionContainer>
    {/* {listingError && <Notification isError={true}>{listingError}</Notification>} */}
    {bookError && <Notification isError={true}>{bookError}</Notification>}
    {sellerError && <Notification isError={true}>{sellerError}</Notification>}
    {console.log(listingError, bookError, sellerError)}

    {/* Image of book */}
    <BookCover imageUrl={listing?.imageUrl || ERROR_BOOK.url} />
    <div>
      {/* General information of book in question */}
      {!listingError
        ? <BookSummary showLink={true} showCover={false} book={book}/>
        : <BookSummary showLink={false} showCover={false} book={ERROR_BOOK}/>
      }
      {/* Purchase ID */}
      <div>Purchase #{hex(id)}-{hex(sellerId)}-{hex(buyerId)}</div>
      {/* Purchase price */}
      {!listingError
        ? <div>
        Purchased for {<Price price={listing?.price} /> || 0}
          {' '} from <Link to={`/user/${listing?.sellerId}`}>{seller?.username}</Link>
        </div>
        : <div>Could not load purchase price information</div>
      }
      {/* Purchase date */}
      <div>Purchased on {new Date(purchaseCreationTime).toLocaleDateString()}</div>
      {/* Change cancel button respective to the user type */}
      {userType !== 'ADMIN' && <Button disabled={!canCancel} onClick={handleCancel}>Cancel</Button>}
    </div>
  </TransactionContainer>
}

export default TransactionsPage