import React from 'react'
import { Link } from 'react-router-dom'

import {BookCover, Rating} from 'components'

import {Author} from './bookSummaryStyle'

// Book information including image, title, author, rating - used whenever a book listing is displayed
const BookSummary = ({ book, showCover=true, showLink=false }) => <div>
  {/* Image */}
  {showCover && <BookCover isbn={book?.isbn} imageUrl={book?.url} />}
  {/* Name */}
  <h1>
    {showLink && <Link to={`/book/${book?.isbn}`}>{book?.title || 'Book'}</Link> }
    {!showLink && (book?.title || 'Book')}
  </h1>
  {/* Author */}
  <Author>{book?.author || 'Author'}</Author>
  {/* Rating */}
  <Rating rating={book?.rating || 0} />
</div>

export default BookSummary
