import React from 'react'

import { BookCover, Rating } from 'components'
import {
  BookInfoContainer,
  BookInfoPara,
  BookInfoAuthor,
  BookInfoDetails
} from './bookInfoStyle'

const BookInfo = ({ book, imageUrl }) => {
  return (
    <BookInfoContainer>
      <div>
        { <BookCover isbn={book.isbn} imageUrl={imageUrl} /> }
        <h1>{book.title}</h1>
        <BookInfoAuthor>{book.author}</BookInfoAuthor>
        <Rating rating={book.rating} />
      </div>
      <div>
        <h2>Blurb</h2>
        <BookInfoPara>{book.blurb || <em>No Blurb Provided</em>}</BookInfoPara>
        <BookInfoDetails>
          <div>
            <h2>Number of Pages</h2>
            <BookInfoPara>{book.numPages}</BookInfoPara>
          </div>
          <div>
            <h2>Category</h2>
            <BookInfoPara>{book.category || <em>No Category</em>}</BookInfoPara>
          </div>
        </BookInfoDetails>
      </div>
    </BookInfoContainer>
  )
}

export default BookInfo