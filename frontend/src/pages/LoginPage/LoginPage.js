import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'

import { login } from '../../services'
import { useAuth } from '../../hooks'
import {
  Container,
  Form,
  InputContainer,
  Heading,
  FieldsContainer,
  ErrorNotification,
} from './loginPageStyle'

const LoginPage = () => {
  const history = useHistory()
  const [error, setError] = useState(null)
  const { setToken, setUserId } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = ({ username, password }) => {
    // Clear error
    setError()

    // Login
    login(username, password)
      .then(({ token, userId }) => {
        if (token && userId) {
          setToken(token)
          setUserId(userId)
          history.push('/')
        } else {
          setError('Something went wrong logging you in')
        }
      })
      .catch(err => setError(err.message))
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading>Login</Heading>
        {error && <ErrorNotification>{error}</ErrorNotification>}
        <FieldsContainer>
          <InputContainer>
            <label>Email</label>
            <input type="email" {...register('email', { required: true })} />
            {errors.email && 'This field is required'}
          </InputContainer>
          <InputContainer>
            <label>Password</label>
            <input
              type="password"
              {...register('password', { required: true })}
            />
            {errors.password && 'This field is required'}
          </InputContainer>
        </FieldsContainer>
        <input type="submit" value="Login" />
      </Form>
    </Container>
  )
}

export default LoginPage
