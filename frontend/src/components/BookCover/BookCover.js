import React from 'react'

import { Cover } from './bookCoverStyle'

const BookCover = ({ isbn, imageUrl }) =>
  <Cover style={{backgroundImage: imageUrl ? `url(${imageUrl})` : `url(https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg)`}} />

export default BookCover
