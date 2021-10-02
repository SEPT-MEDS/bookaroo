import React, { useState } from 'react'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'

import { createPurchase } from 'services'
import { Notification } from 'components'
import { useCurrentProfile } from 'hooks'

import { PurchaseButtonContainer } from './listingDetailPageStyle'

const buttonStyle = {
  'layout': 'vertical',
  'color': 'black',
  'height': 40,
  'shape': 'pill',
  'label': 'paypal',
  'tagline': false,
}

const PurchaseButton = ({ listingId, price, onPurchase, onError }) => {
  const [{ isResolved }] = usePayPalScriptReducer()
  const profile = useCurrentProfile()
  const [error, setError] = useState()

  const createOrder = (data, actions) => {
    console.log(data, actions)
    return actions.order.create({
      purchase_units: [
        { amount: { value: price } }
      ]
    })
  }

  // Handler for purchase approved
  const handleApprove = profile => async (data, actions) => {
    const capture = await actions.order.capture()
    createPurchase({
      listingId,
      buyerId: profile.id,
      paypalData: btoa(JSON.stringify({ captureId: capture.id })) // Send paypal data as base64 encoded JSON
    }).then(() => {
      if (onPurchase)
        onPurchase()
    }).catch(e => {
      if (onError)
        onError(e)
    })
  }

  // Handler for purchase failed
  const handleError = error => {
    console.log(error)
    setError(String(error)) 
  }

  return <PurchaseButtonContainer>
    {profile && <PayPalButtons
      style={buttonStyle}
      createOrder={createOrder}
      onApprove={handleApprove(profile)}
      onError={handleError} disabled={!isResolved} />}
    {error && <Notification isError={true}>{error}</Notification>}
  </PurchaseButtonContainer>
}

export default PurchaseButton