import React from 'react'
import { Link } from 'react-router-dom'

import { CardContainer, Cover, Details, Author } from './bookCardStyle'
import { Rating } from '../../components'

const BookCard = ({ title, author, rating, isbn }) => {
  const coverId = Math.floor(Math.random() * 100)
  return (
    <CardContainer as={Link} to={`/book/${isbn}`}>
      <Cover src={`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`} />
      <Details>
        <h2>{title}</h2>
        <Author>{author}</Author>
        <Rating rating={rating} />
      </Details>
    </CardContainer>
  )
}

export default BookCard
