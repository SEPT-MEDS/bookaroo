import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useAsync } from 'hooks'
import { getUser, getUserReviews, getBook, getListingsBySeller } from 'services'
import { Reviews, Spinner, Notification } from 'components'

import { Container, ListingContainer } from './profileDetailPageStyle'

const ProfileDetailPage = () => {
  const { id } = useParams()
  const { response: user, isLoading, error } = useAsync(() => getUser(id), [id])
  const { response: listings } = useAsync(() => getListingsBySeller(id), [user])
  const { response: reviews } = useAsync(() => getUserReviews(id).then(reviews => { setIsValid(true); return reviews }), [user, isValid])
  const [isValid, setIsValid] = useState(false)

  return isLoading && !(user || error) ? (
    <Spinner />
  ) : (
    <Container>
      {error && <Notification isError={true}>{error}</Notification>}
      {user && (
        <>
          <h1>
            {`${user?.firstName} ${user?.lastName}`} <em>({user?.username})</em>
          </h1>
          <section>
            <h2> Listings by {user?.username}</h2>
            <div>
              {!listings ? (
                <span>This user has no listings</span>
              ) : (
                listings.map(listing => <Listing key={listing.id} {...listing} />)
              )}
            </div>
          </section>
          <section>
            <h2> Reviews of {user?.username}</h2>
            <Reviews reviews={reviews} onPost={() => setIsValid(false)} />
          </section>
        </>
      )}
    </Container>
  )
}

const Listing = ({ id, price, imageUrl, isPreowned, isSwap, bookIsbn }) => {
  const { response: book } = useAsync(() => getBook(bookIsbn), [bookIsbn])

  return (
    <ListingContainer>
      <div style={{ backgroundImage: `url(${imageUrl})` }} />
      <div>
        <h3>
          <Link to={`/listing/${id}`}>{book ? book.title : 'Book'}</Link>
        </h3>
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
    </ListingContainer>
  )
}
export default ProfileDetailPage
