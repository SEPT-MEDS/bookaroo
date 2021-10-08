import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { getUser, createReview } from 'services'
import { useAsync, useCurrentProfile } from 'hooks'
import { Rating } from 'components'

import { ReviewBlock, ReviewInputForm, ReviewSection } from './reviewsStyle'

// Single review block
const Review = ({ review }) => {
  const { response: reviewer } = useAsync(() => getUser(review.reviewerId), [review.reviewerId])
  return <ReviewBlock key={review}>
    {/* Name - Links to their profile */}
    <h3><Link to={`/user/${review.reviewerId}`}>
      {reviewer
        ? (`${reviewer.firstName} ${reviewer.lastName} (${reviewer.username})`)
        : 'Reviewer'}</Link>
    </h3>
    {/* Star rating */}
    <Rating rating={review.rating} />
    {/* Text/content of the review */}
    <p>{review.content}</p>
  </ReviewBlock>
}

// Component used for rendering reviews
const Reviews = ({ reviews, entityId, onPost = () => { } }) => {
  const profile = useCurrentProfile()
  const { register, handleSubmit, reset, watch } = useForm()
  const watchRating = watch('rating', 0)

  // Posts a review, empties the fields, and reloads the component to display your review
  const onCreateReview = fields => {
    createReview({ ...fields, reviewerId: profile.id, entityId })
      .then(() => {
        reset()
        onPost()
      })
  }

  return <ReviewSection>
    {/* Form for creating a review/rating */}
    <ReviewInputForm onSubmit={handleSubmit(onCreateReview)}>
      <input type="text" maxLength="255" placeholder="Write a review" {...register('content', {required: true})} />
      <input type="number" min="1" max="5" placeholder="Rating" {...register('rating', {required: true, min: 1, max: 5})}/>
      <Rating rating={watchRating} />
      <input type="submit" value="Submit" />
    </ReviewInputForm>
    {/* Map all reviews for current entity to separate blocks */}
    {reviews?.length ?
      // for each review create block
      <div>
        {reviews.map(review => <Review review={review} key={review.id}/>)}
      </div>
      : <p>There are no reviews</p>}
  </ReviewSection>
}

export default Reviews
