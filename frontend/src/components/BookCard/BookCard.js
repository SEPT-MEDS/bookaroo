import React from 'react'
import { Link } from 'react-router-dom'

import { CardContainer, Details, Author } from './bookCardStyle'
import { BookCover, Rating } from 'components'

const BookCard = ({ title, author, rating, isbn }) => {
  return (
    <CardContainer as={Link} to={`/book/${isbn}`}>
      <BookCover isbn={isbn} />
      <Details>
        <h2>{title}</h2>
        <Author>{author}</Author>
        <Rating rating={rating} />
      </Details>
    </CardContainer>
  )
}

export default BookCard
