import React from 'react'

import { Container, Cover, Details, Author, RatingText } from './bookCardStyle'

const BookCard = ({ title, author, rating }) => {
  const coverId = Math.floor(Math.random() * 100)
  return <Container>
    <Cover src={`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`} />
    <Details>
      <h2>{title}</h2>
      <Author>{author}</Author>
      <RatingText>{'⭐️'.repeat(Math.floor(rating))}({rating})</RatingText>
    </Details>
  </Container>
}

export default BookCard
