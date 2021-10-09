import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAsync } from 'hooks'
import { getUser, getListingsBySeller } from 'services'
import { Spinner, Notification, UserReviews, ListingCard, Rating } from 'components'

import { Container, ListingsContainer, RatingContainer } from './profileDetailPageStyle'

// Profile page for users
const ProfileDetailPage = () => {
  const [listingsAreValid, setListingsAreValid] = useState(false)
  const { id } = useParams()
  const { response: user, isLoading, error } = useAsync(() => getUser(id), [id])
  const { response: listings } = useAsync(() => getListingsBySeller(id).then(l => {setListingsAreValid(true); return l}), [user, listingsAreValid])

  return isLoading && !(user || error) ? (
    <Spinner />
  ) : (
    <Container>
      {error && <Notification isError={true}>{error}</Notification>}
      {user && (
        <>
          {/* Display name and rating of user */}
          <h1>
            {`${user?.firstName} ${user?.lastName} (${ user?.username})`}
            <RatingContainer><Rating rating={user?.rating} /></RatingContainer>
          </h1>

          {/* Display listings by user */}
          <section>
            <h2> Listings by <em>{user?.username}</em></h2>
            <ListingsContainer>
              {listings?.length ? (
                listings.map(listing => <ListingCard key={listing.id} cardStyle={ListingCard.BOOK_FOCUS} {...listing} onDelete={() => setListingsAreValid(false)} />)
              ) : (
                <span>This user has no listings</span>
              )}
            </ListingsContainer>
          </section>

          {/* Display reviews of user */}
          <section>
            <UserReviews user={user}></UserReviews>
          </section>
        </>
      )}
    </Container>
  )
}

export default ProfileDetailPage
