import React from 'react'

const Price = ({price, currency = 'aud'}) =>
  price ? <span>{Number(price).toLocaleString(undefined, { style: 'currency', currency })}</span> : <></>

export default Price
