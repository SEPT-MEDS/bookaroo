import React from 'react'
import { RatingText } from './ratingStyle'

// Function to clamp the rating between 1 and 5 (inclusive)
const clamp = (v, min, max) => Math.min(Math.max(v, min), max)

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
