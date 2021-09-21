// import api from './'

export const getBookReviews = async isbn => {
  console.log(isbn)
  return [{
    user: 0,
    rating: 3,
    text:'this is the coolest book ever!!!!'
  },
  {
    user: 1,
    rating: 5,
    text: 'i love this book.. so much.... i sold all my belongings so i can buy 200 copies'
  },
  {
    user: 2,
    rating: 1,
    text: 'worst book ever. DO NOT BUY'
  }]
  // const { data } = await api.get(`/book/${isbn}/reviews`)
  // return data.reviews
}

