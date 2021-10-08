import React from 'react'

const Price = (price, currency = 'AUD') => {
  return <>
    {Number(price).toLocaleString(undefined, { style: 'currency', currency })}
  <>
}

export default Price
