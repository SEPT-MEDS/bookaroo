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

    const filteredBooks = (await Promise.all([
      api.get(`/book/containingTitle/${filter}`),
      api.get(`/book/containingAuthor/${filter}`),
    ])).map(r => r.data.books).reduce((a, b) => [...a, ...b], [])

    return intersectionBy(allBooks, filteredBooks, 'isbn')
  } catch (e) {
    console.warn(e)
    return []
  }
}
