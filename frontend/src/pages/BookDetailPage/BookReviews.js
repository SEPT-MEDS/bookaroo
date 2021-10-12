import React from 'react'

import { Reviews } from 'components'
import { getBookReviews } from 'services'
import { useAsync } from 'hooks'

// All reviews of a given book
const BookReviews = ({book}) => {
  const { response: reviews, invalidate } = useAsync(() => getBookReviews(book.isbn), [book])

  return <div>
    <h2>
      Reviews of <em>{book.title}</em>
    </h2>
    <Reviews reviews={reviews} entityId={book.isbn} onPost={() => invalidate()} />
  </div>
}

export default BookReviews
