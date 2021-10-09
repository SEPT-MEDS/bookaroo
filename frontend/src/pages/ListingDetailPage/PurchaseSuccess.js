import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import { useAsync } from 'hooks'
import { getBook, getUser } from 'services'

import { PurchaseSuccessContainer } from './listingDetailPageStyle'

// Rendered when a successful purchase is recorded
const PurchaseSuccess = ({ bookIsbn, sellerId, price }) => {
  const { response: book } = useAsync(() => getBook(bookIsbn), [bookIsbn])
  const { response: seller } = useAsync(() => getUser(sellerId), [sellerId])

  return <PurchaseSuccessContainer>
    {/* Check mark */}
    <FontAwesomeIcon icon={faCheckCircle} />

    {/* Purchase successful text */}
    <h2> Your purchase {book ? 'of' : ''} {book && <Link to={`/book/${bookIsbn}`}>{book.title} </Link>}
      from <Link to={`/user/${sellerId}`}>{seller ? seller.username : 'the seller'}</Link> was successful. </h2>

    {/* Scrolling thank you message */}
    <marquee scrollAmount={9}> Thank you for your ${price} purchase.</marquee>

    {/* Link back to home page */}
    <h3><Link to={'/'}>Back to homepage</Link></h3>
  </PurchaseSuccessContainer>
}

export default PurchaseSuccess