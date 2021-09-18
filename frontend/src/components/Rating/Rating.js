import React from 'react'
import { RatingText } from './ratingStyle'

const Rating = ({ rating }) => {
  return <RatingText>
    {'⭐️'.repeat(Math.floor(rating))}({rating})
  </RatingText>
}

export default Rating
