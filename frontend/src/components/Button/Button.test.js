import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

import Button from './Button'

it('Renders a button', () => {
  render(<Button />)
  expect(screen.getByRole('button')).toBeTruthy()
})

it('Has a classname', () => {
  render(<Button />)
  expect(screen.getByRole('button').className).toBeTruthy()
})

it('Passes along props', () => {
  const testId = 'test'
  render(<Button id={testId} />)
  expect(screen.getByRole('button').id).toBe(testId)
})
