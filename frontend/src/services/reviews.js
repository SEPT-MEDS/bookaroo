import api from './'

export const getBookReviews = async isbn => {
  const { data } = await api.get(`/book/${isbn}/reviews`)
  return data.reviews
}

export const getUserReviews = async userId => {
  const { data } = await api.get(`/user/${userId}/reviews`)
  return data.reviews
}

export const createReview = async fields => {
  /**
   * entityId
   * reviewerId
   * rating
   * content
   */
  const { data } = await api.post('/review', fields)
  return data.review
}

