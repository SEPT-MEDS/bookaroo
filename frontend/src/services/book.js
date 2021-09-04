import intersectionBy from 'lodash.intersectionby'
//import unionBy from 'lodash.unionby'
import api from './'

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

    // Search books by title and author
    const filteredBooks = (await Promise.all([
      api.get(`/book/containingTitle/${filter}`),
      api.get(`/book/containingAuthor/${filter}`),
    ])).map(r => r.data.books).reduce((a, b) => [...a, ...b], [])

    // Search books by ISBN
    const exactBook = await getBook(filter)
      .catch(() => {console.clear() /* HACK*/})

    return intersectionBy(allBooks, [...filteredBooks, exactBook], 'isbn')
  } catch (e) {
    console.warn(e)
    return []
  }
}
