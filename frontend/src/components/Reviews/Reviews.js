import React from 'react'
import { default as Rating } from '../Rating/Rating'
import { ReviewBlock, ReviewInput, ReviewSection } from './reviewsStyle'

const Reviews = ({ reviews }) => {
  return <ReviewSection>
    <ReviewInput>
      <form>
        <input type="text" placeholder="Write a review"></input>
        <input type="number" min="1" max="5" placeholder="Rating"></input>
        <input type="submit" value="Submit"></input>
      </form>
    </ReviewInput>
    {reviews ? 
      // for each review create block
      <div>
        {reviews.map(review => <ReviewBlock key={review}>
          <h3>{review.user}</h3>
          <Rating rating={review.rating} />
          <p>{review.text}</p>
        </ReviewBlock>)}
      </div>
      : <p>There are no reviews</p>}
  </ReviewSection>
}

export default Reviews
