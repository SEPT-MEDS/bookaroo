import React from 'react'
import { RatingText } from './ratingStyle'

const clamp = (v, min, max) => Math.min(Math.max(v, min), max)

const Rating = ({ rating, maxRating = 5 }) => {
  const clampedRating = clamp(rating, 0, maxRating)
  return <RatingText>
    <span className='filled'>{'⭐️'.repeat(clampedRating)}</span>
    <span className='unfilled'>{'⭐️'.repeat(maxRating-clampedRating)}</span>
    ({rating})
  </RatingText>
}

export default Rating
