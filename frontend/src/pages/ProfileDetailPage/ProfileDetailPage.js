import React from 'react'
import { useParams } from 'react-router-dom'

import { useAsync } from 'hooks'
import { getUser, getListingsBySeller } from 'services'
import { Spinner, Notification, UserReviews, ListingCard } from 'components'

import { Container, ListingsContainer } from './profileDetailPageStyle'

const ProfileDetailPage = () => {
  const { id } = useParams()
  const { response: user, isLoading, error } = useAsync(() => getUser(id), [id])
  const { response: listings } = useAsync(() => getListingsBySeller(id), [user])

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
            <ListingsContainer>
              {listings?.length ? (
                listings.map(listing => <ListingCard key={listing.id} cardStyle={ListingCard.BOOK_FOCUS} {...listing}  />)
              ) : (
                <span>This user has no listings</span>
              )}
            </ListingsContainer>
          </section>
          <section>
            <UserReviews user={user}></UserReviews>
          </section>
        </>
      )}
    </Container>
  )
}

export default ProfileDetailPage
