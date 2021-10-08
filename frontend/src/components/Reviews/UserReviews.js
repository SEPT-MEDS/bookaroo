import React, { useEffect, useState } from 'react'
import { Reviews } from 'components'
import { getUserReviews } from 'services'

// Used for reviews on a user profile - Extension of Reviews component
const UserReviews = ({user}) => {
  const [reviews, setReviews] = useState()
  const [isValid, setIsValid] = useState(false)

  // Ensures the reviews are always up to date with the system
  useEffect(() => {
    if (user) {
      getUserReviews(user.id)
        .then(reviews => setReviews(reviews))
        .then(() => setIsValid(true))
    }
  },[user, isValid])

  return <div>
    <h2>
      Reviews of <em>{user.username}</em>
    </h2>
    <Reviews reviews={reviews} entityId={user.id} onPost={() => setIsValid(false)} />
  </div>
}

export default UserReviews