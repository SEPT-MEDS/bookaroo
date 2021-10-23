import React from 'react'

import { clamp } from 'utils'
import { RatingText } from './ratingStyle'

// Component to render stars based on provided rating
const Rating = ({ rating, maxRating = 5 }) => {
  const clampedRating = clamp(rating, 0, maxRating)
  return <RatingText>
    {/* Render x filled stars */}
    <span className='filled'>{'⭐️'.repeat(clampedRating)}</span>
    {/* Set remainder of stars to greyed out */}
    <span className='unfilled'>{'⭐️'.repeat(maxRating-clampedRating)}</span>
    ({clampedRating})
  </RatingText>
}

export default Rating
