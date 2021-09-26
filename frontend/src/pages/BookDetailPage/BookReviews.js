import React, { useEffect, useState } from 'react'
import { Reviews } from 'components'
import { getBookReviews } from 'services'

const BookReviews = ({book}) => {
  const [reviews, setReviews] = useState()
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (book) {
      // two children with same key?
      getBookReviews(book.isbn)
        .then(reviews => setReviews(reviews))
        .then(() => setIsValid(true))
    }
  },[book, isValid])

  return <div>
    <h2>
      Reviews of <em>{book.title}</em>
    </h2>
    <Reviews reviews={reviews} entityId={book.isbn} onPost={() => setIsValid(false)} />
  </div>
}

export default BookReviews