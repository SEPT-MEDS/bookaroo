import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import Spinner from './Spinner'


it('Renders a styled component', () => {
  const { container } = render(<Spinner />)
  expect(container.firstChild?.className).toBeTruthy() 
})

