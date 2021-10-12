import React from 'react'

import { Reviews } from 'components'
import { getUserReviews } from 'services'
import { useAsync } from 'hooks'

// Used for reviews on a user profile - Extension of Reviews component
const UserReviews = ({user}) => {
  const { response: reviews, invalidate } = useAsync(() => getUserReviews(user.id), [user])

  return <div>
    <h2>
      Reviews of <em>{user.username}</em>
    </h2>
    <Reviews reviews={reviews} entityId={user.id} onPost={() => invalidate()} />
  </div>
}

export default UserReviews
