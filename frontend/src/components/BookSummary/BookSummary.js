import React from 'react'

import {BookCover, Rating} from 'components'

import {Author} from './bookSummaryStyle'

const BookSummary = ({ book, imageUrl }) => <div>
  <BookCover isbn={book?.isbn} imageUrl={imageUrl} />
  <h1>{book?.title || 'Book'}</h1>
  <Author>{book?.author || 'Author'}</Author>
  <Rating rating={book?.rating || 0} />
</div>

export default BookSummary
