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