import React from 'react'
import { default as Rating } from '../Rating/Rating'
import { ReviewBlock, ReviewInput, ReviewSection } from './reviewStyle'

const Review = ({ book, reviews }) => {
  const rev =
    // undefined
    {
      user: 'CoolestUser22',
      rating: 3,
      text: 'This is the coolest book ever!'
    }
  {console.log('REV =', rev)}
  {console.log('REVIEW =', reviews)}
    
  return <ReviewSection>
    <h2>
      Reviews of <em>{book.title}</em>
    </h2>
    <ReviewInput>
      <form>
        <input type="text" placeholder="Write a review"></input>
        <input type="number" min="1" max="5" placeholder="Rating"></input>
        <input type="submit" value="Submit"></input>
      </form>
    </ReviewInput>
    {rev ? 
      // for each review create block
      <div>
        <ReviewBlock>
          <h3>{rev.user}</h3>
          <Rating rating={rev.rating} />
          <p>{rev.text}</p>
        </ReviewBlock>
        <ReviewBlock>
          <h3>{rev.user}</h3>
          <Rating rating={rev.rating} />
          <p>{rev.text}</p>
        </ReviewBlock>
      </div>

      : <p>There are no reviews</p>}
  </ReviewSection>
}

export default Review

