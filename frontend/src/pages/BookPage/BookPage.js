import React, { useState, useEffect } from 'react'

import { BookGrid } from '../../components'
import { getAllBooks } from '../../services'

const BookPage = () => {
  const [books, setBooks] = useState()

  useEffect(() => {
    getAllBooks()
      .then(books => setBooks(books))
  })

  return <BookGrid books={books}/>
}

export default BookPage
