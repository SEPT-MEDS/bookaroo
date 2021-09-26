import React from 'react'
import { useForm } from 'react-hook-form'

import { getUser, createReview } from 'services'
import { useAsync, useCurrentProfile } from 'hooks'
import { Rating } from 'components'

import { ReviewBlock, ReviewInputForm, ReviewSection } from './reviewsStyle'

const Review = ({ review }) => {
  const { response: reviewer } = useAsync(() => getUser(review.reviewerId), [review.reviewerId])
  return <ReviewBlock key={review}>
    <h3>{reviewer?.username || 'Reviewer'}</h3>
    <Rating rating={review.rating} />
    <p>{review.content}</p>
  </ReviewBlock>
}

const Reviews = ({ reviews, entityId, onPost = () => { } }) => {
  const profile = useCurrentProfile()
  const { register, handleSubmit, reset, watch } = useForm()
  const watchRating = watch('rating', 0)

  const onCreateReview = fields => {
    createReview({ ...fields, reviewerId: profile.id, entityId })
      .then(() => {
        reset()
        onPost()
      })
  }

  return <ReviewSection>
    <ReviewInputForm onSubmit={handleSubmit(onCreateReview)}>
      <input type="text" placeholder="Write a review" {...register('content', {required: true})} />
      <input type="number" min="1" max="5" placeholder="Rating" {...register('rating', {required: true, min: 1, max: 5})}/>
      <Rating rating={watchRating} />
      <input type="submit" value="Submit" />
    </ReviewInputForm>
    {reviews?.length ?
      // for each review create block
      <div>
        {reviews.map(review => <Review review={review} key={review.id}/>)}
      </div>
      : <p>There are no reviews</p>}
  </ReviewSection>
}

export default Reviews
