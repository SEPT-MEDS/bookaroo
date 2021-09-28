import React from 'react'
import { Link } from 'react-router-dom'

import {BookCover, Rating} from 'components'

import {Author} from './bookSummaryStyle'

const BookSummary = ({ book, imageUrl, showCover=true, showLink=false }) => <div>
  {showCover && <BookCover isbn={book?.isbn} imageUrl={imageUrl} />}
  <h1>
    {showLink && <Link to={`/book/${book?.isbn}`}>{book?.title || 'Book'}</Link> }
    {!showLink && (book?.title || 'Book')}
  </h1>
  <Author>{book?.author || 'Author'}</Author>
  <Rating rating={book?.rating || 0} />
</div>

export default BookSummary
