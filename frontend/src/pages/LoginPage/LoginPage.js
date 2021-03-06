import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Redirect, Link, useHistory, useLocation } from 'react-router-dom'

import { login } from '../../services'
import { useAuth } from '../../hooks'
import {
  Container,
  Form,
  InputContainer,
  Heading,
  FieldsContainer,
  LinkContainer
} from './loginPageStyle'
import { Notification } from '../../components'

// Log in page
const LoginPage = () => {
  const location = useLocation()
  const history = useHistory()
  const [error, setError] = useState(null)
  const { isLoggedIn, authLogin } = useAuth()
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
        // Successful login - Take user to home page (book list)
        if (token && userId) {
          authLogin(token, userId)
          history.push(location?.state?.from?.pathname || '/')
        // Unsuccessful login - Display error
        } else {
          setError('Something went wrong logging you in')
        }
      })
      // Credentials are wrong or account is disabled
      .catch(err => {
        if (err?.response?.status == 403 || err?.response?.status == 401) {
          setError('Incorrect username or password')
        } else {
          setError(err.message)
        }
      })
  }

  return (
    <Container>
      {isLoggedIn && <Redirect to='/' />}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading>Login</Heading>
        {error && <Notification isError={true}>{error}</Notification>}

        {/* Username and password fields */}
        <FieldsContainer>
          <InputContainer>
            <label>Username</label>
            <input type="username" {...register('username', { required: true })} />
            {errors.username && 'This field is required'}
          </InputContainer>

          <InputContainer>
            <label>Password</label>
            <input
              type="password"
              {...register('password', { required: true })}
            />
            {errors.password && 'This field is required'}
          </InputContainer>

          <LinkContainer>
            {'Don\'t have an account? '}
            <Link to='/signup/customer'>Signup here</Link>
          </LinkContainer>
        </FieldsContainer>
        <input type="submit" value="Login" />
      </Form>
    </Container>
  )
}

export default LoginPage
