import React from 'react'
import { RatingText } from './ratingStyle'

const Rating = ({ rating, maxRating=5 }) => {
  return <RatingText>
    {'⭐️'.repeat(Math.floor(rating))}
    <span className='unfilled'>{'⭐️'.repeat(maxRating-Math.floor(rating))}</span>
    ({rating})
  </RatingText>
}

export default Rating
