import intersectionBy from 'lodash.intersectionby'
import unionBy from 'lodash.unionby'
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

    let filteredBooks = allBooks
    if (filter) {
      const filtered = (await Promise.all([
        api.get(`/book/containingTitle/${filter}`),
        api.get(`/book/containingAuthor/${filter}`),
      ])).map(r => r.data.books)
      filteredBooks = unionBy(filtered, b => b.isbn)
    }

    return intersectionBy([...allBooks, ...filteredBooks], b => b.isbn)
  } catch (e) {
    console.warn(e)
    return []
  }
}
