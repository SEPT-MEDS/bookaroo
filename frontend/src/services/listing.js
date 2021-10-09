import api from './'

export const getListing = async id => {
  const {data: {listing}} = await api.get(`/listing/${id}`)
  return listing
}

export const getBookListings = async isbn => {
  const { data } = await api.get(`/book/${isbn}/listings`)
  return data.listings.filter(l => l.isVisible)
}

export const getListingsBySeller = async id => {
  const { data } = await api.get(`/user/${id}/listings`)
  return data.listings.filter(l => l.isVisible)
}

export const createListing = async fields => {
  const { data } = await api.post('/listing', fields)
  return data.listing
}

export const removeListing = async id => {
  const data = await api.delete(`/listing/${id}`)
  return data
}

