import React from 'react'

const Price = ({price, currency = 'aud'}) => {
  return <>
    {Number(price).toLocaleString(undefined, { style: 'currency', currency })}
  </>
}

export default Price
