import React from 'react'

import { Cover } from './bookCoverStyle'

// Image of a given book, used wherever an image is required (e.g. main book page, book edit page, etc)
const BookCover = ({ isbn, imageUrl }) => {
  // Uses passed in image URL if available, otherwise attempt to use OpenLibrary API image
  return <Cover style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : `url(https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg)` }} />
}

export default BookCover
