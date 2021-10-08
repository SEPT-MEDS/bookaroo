import React, { useEffect, useState } from 'react'
import { Reviews } from 'components'
import { getBookReviews } from 'services'

// All reviews of a given book
const BookReviews = ({book}) => {
  const [reviews, setReviews] = useState()
  const [isValid, setIsValid] = useState(false)

  // Ensure reviews remain up to date with the system itself
  useEffect(() => {
    if (book) {
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