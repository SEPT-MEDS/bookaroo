import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Notification from './Notification'


it('Renders the children', () => {
  const text = 'test'
  render(<Notification><span>{text}</span></Notification>)
  expect(screen.getByText(text)).toBeTruthy()
})

it('Applies error className when isError is set', () => {
  const { container } = render(<Notification isError={true} />)
  expect(container.firstChild.className).toMatch(/error/)
})
