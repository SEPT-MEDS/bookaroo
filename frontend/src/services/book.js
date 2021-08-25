import api from './'

// TODO: remove
const testBooks = [
  {
    title: 'My Cool Book',
    author: 'Ewan Breakey',
    rating: 4
  },
  {
    title: 'Another Great Book',
    author: 'Maxwell Reid',
    rating: 1
  },
  {
    title: 'Something I Found On The Floor',
    author: 'Thomas Dib',
    rating: 3
  },
  {
    title: 'Nuclear War: A Threat to Us All',
    author: 'Sefanur Erciyas',
    rating: 5
  },
  {
    title: 'The Weather Today: An Intro to C',
    author: 'Dale Stanbrough',
    rating: 5,
  }
]

export const getAllBooks = async filter => {
  console.log('Should have hit the api using', filter)
  const {data} = testBooks // TODO: await api.get('/book', { filter })
  return data.data
}
