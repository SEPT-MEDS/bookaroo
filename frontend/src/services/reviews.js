import api from './'

export const getBookReviews = async isbn => {
  const { data } = await api.get(`/book/${isbn}/reviews`)
  console.log(data)
  return data.reviews
}

export const getUserReviews = async userId => {
  const { data } = await api.get(`/user/${userId}/reviews`)
  console.log(data)
  return data.reviews
}

