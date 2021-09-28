import api from './'
import { getListing } from './listing'

export const createPurchase = async fields => {
  // fields should be 
  //  - listingId
  //  - buyerId
  //  - paypalData
  const purchaseCreationTime = Date.now()
  const { sellerId } = await getListing(fields.listingId)
  const { data } = await api.post('/purchase', { ...fields, sellerId, purchaseCreationTime })
  return data.purchase
}

export const getPurchasesBySeller = async sellerId => {
  const { data } = await api.get(`/purchase/bySellerId/${sellerId}`)
  return data.purchases
}

export const getPurchasesByBuyer = async buyerId => {
  const { data } = await api.get(`/purchase/byBuyerId/${buyerId}`)
  return data.purchases
}

export const getAllPurchases = async () => {
  const { data } = await api.get('/purchases')
  return data.purchases
}

export const cancelPurchase = async purchaseId => {
  const { data } = await api.delete(`/purchase/${purchaseId}`)
  return data
}