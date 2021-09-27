import React from 'react'
import { RatingText } from './ratingStyle'

const clamp = (v, min, max) => Math.min(Math.max(v, min), max)

const Rating = ({ rating, maxRating = 5 }) => {
  {rating = clamp(rating, 0, maxRating)}
  return <RatingText>
    <span className='filled'>{'⭐️'.repeat(rating)}</span>
    <span className='unfilled'>{'⭐️'.repeat(maxRating-rating)}</span>
    ({rating})
  </RatingText>
}

export default Rating
