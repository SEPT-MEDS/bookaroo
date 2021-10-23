import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

export const wrapWithRouter = (comp, history=createMemoryHistory()) =>
  <Router history={history}>
    {comp}
  </Router>
