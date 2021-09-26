import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'

import { createPurchase } from 'services'
import { Notification } from 'components'
import { useCurrentProfile } from 'hooks'

const buttonStyle = {
  'layout': 'vertical',
  'color': 'black',
  'height': 40,
  'shape': 'pill',
  'label': 'paypal',
  'tagline': false,
}

const PurchaseButton = ({ listingId, price, redirect }) => {
  const [{ isResolved }] = usePayPalScriptReducer()
  const profile = useCurrentProfile()
  const [error, setError] = useState()
  const history = useHistory()

  const createOrder = (data, actions) => {
    console.log(data, actions)
    return actions.order.create({
      purchase_units: [
        { amount: { value: price } }
      ]
    })
  }

  // Handler for purchase approved
  const handleApprove = (profile, history) => async (data, actions) => {
    const capture = await actions.order.capture()
    await createPurchase({
      listingId,
      buyerId: profile.id,
      paypalData: btoa(JSON.stringify({ captureId: capture.id })) // Send paypal data as base64 encoded JSON
    })
    alert('Purchase Successful!')
    if (redirect) history.push(redirect)
  }

  // Handler for purchase failed
  const handleError = error => {
    console.log(error)
    setError(String(error)) 
  }

  return <>
    {profile && <PayPalButtons
      style={buttonStyle}
      createOrder={createOrder}
      onApprove={handleApprove(profile, history)}
      onError={handleError} disabled={!isResolved} />}
    {error && <Notification isError={true}>{error}</Notification>}
  </>
}

export default PurchaseButton