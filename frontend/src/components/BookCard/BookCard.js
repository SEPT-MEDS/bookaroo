import React from 'react'
import { Link } from 'react-router-dom'

import { CardContainer, Details, Author } from './bookCardStyle'
import { BookCover, Rating } from 'components'

// A single book card as used in the home page with all books
const BookCard = ({ title, author, rating, isbn, url }) => {
  return (
    <CardContainer as={Link} to={`/book/${isbn}`}>
      {/* Image of the book */}
      <BookCover isbn={isbn} imageUrl={url} />
      {/* Details of the book including title, author and rating */}
      <Details>
        <h2>{title}</h2>
        <Author>{author}</Author>
        <Rating rating={rating} />
      </Details>
    </CardContainer>
  )
}

export default BookCard
