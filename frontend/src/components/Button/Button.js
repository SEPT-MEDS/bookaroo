import React from 'react'

import { StyledButton } from './buttonStyle'

// A styled button that conforms to the style of the site
const Button = ({...props}) => {
  return <StyledButton {...props}></StyledButton>
}

export default Button
