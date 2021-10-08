import api from './'

export const getListing = async id => {
  const {data: {listing}} = await api.get(`/listing/${id}`)
  return listing
}

export const getBookListings = async isbn => {
  const { data } = await api.get(`/book/${isbn}/listings`)
  return data.listings
}

export const getListingsBySeller = async id => {
  const { data } = await api.get(`/user/${id}/listings`)
  return data.listings
}

export const createListing = async fields => {
  console.log('Creating a listing with', fields)
  const { data } = await api.post('/listing', fields)
  console.log('Received data:', data)
  return data.listing
}

export const removeListing = async id => {
  const data = await api.delete(`/listing/${id}`)
  return data
}

