import intersectionBy from 'lodash.intersectionby'
import api from './'

export const getAllReviews = async () => {
  try {
   // const {data: {reviews: allReviews} = await (api.get('/book/reviews'))}

   //  const {data: {books: allBooks}} = await (category
   //    ? api.get(`/book/byCategory/${category}`)
   //    : api.get('/book'))

    if (!filter)
      return allBooks

  } catch (e) {
    console.warn(e)
    return []
  }
}

