import intersectionBy from 'lodash.intersectionby'
import api from './'

export const createBook = async fields => {
  const { data } = await api.post('/book', fields)
  return data.book
}

export const getBook = async isbn => {
  const {data: {book}} = await api.get(`/book/${isbn}`)
  return book
}

export const getAllBooks = async (filter, category) => {
  try {
    const {data: {books: allBooks}} = await (category
      ? api.get(`/book/byCategory/${category}`)
      : api.get('/book'))

    if (!filter)
      return allBooks

    // Search books by title, author and isbn
    const filteredBooks = (await Promise.all([
      api.get(`/book/containingTitle/${filter}`),
      api.get(`/book/containingAuthor/${filter}`)
    ])).map(r => r.data.books).reduce((a, b) => [...a, ...b], [])

    let exactBookByISBN
    try {
      if (!isNaN(filter)) {
        exactBookByISBN = await getBook(filter)
      }
    } catch (e) {
      console.warn('')
    }

    return intersectionBy(allBooks, [...filteredBooks, exactBookByISBN], 'isbn')
  } catch (e) {
    console.warn(e)
    return []
  }
}
