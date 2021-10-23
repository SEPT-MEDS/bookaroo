import React from 'react'
import { Link } from 'react-router-dom'

import {BookCover, Rating} from 'components'

import {Author, Title} from './bookSummaryStyle'

// Book information including image, title, author, rating - used whenever a book listing is displayed
const BookSummary = ({ book, showCover=true, showLink=true }) => <div>
  {/* Image */}
  {showCover && <BookCover isbn={book?.isbn} imageUrl={book?.url} />}
  {/* Name */}
  {showLink && <Title as={Link} to={`/book/${book?.isbn}`}>{book?.title || 'Book'}</Title>}
  {!showLink && <Title>{book?.title || 'Book'}</Title>}
  {/* Author */}
  <Author>{book?.author || 'Author'}</Author>
  {/* Rating */}
  <Rating rating={book?.rating || 0} />
</div>

export default BookSummary
