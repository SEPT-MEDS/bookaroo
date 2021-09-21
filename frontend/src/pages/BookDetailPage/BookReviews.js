import React, { useEffect, useState } from 'react'
import { Reviews } from 'components'
import { getBookReviews } from 'services'

const BookReviews = ({book}) => {
  const [reviews, setReviews] = useState()

  useEffect(() => {
    if (book) {
      getBookReviews(book.isbn)
        .then(reviews => setReviews(reviews))
    }
  },[book])

  return <div>
    <h2>
      Reviews of <em>{book.title}</em>
    </h2>
    <Reviews reviews={reviews} />
  </div>
}

export default BookReviews