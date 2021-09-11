import React from 'react'

import { Cover } from './bookCoverStyle'

const BookCover = ({ isbn }) =>
  <Cover style={{backgroundImage: `url(https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg)`}} />

export default BookCover
