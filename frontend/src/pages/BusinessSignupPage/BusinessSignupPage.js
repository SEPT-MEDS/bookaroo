import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'

import { signup } from '../../services'

import {
  Container,
  Form,
  InputContainer,
  Heading,
  FieldsContainer,
  ErrorNotification,
} from './businessSignupPageStyle'


const LoginPage = () => {
  const history = useHistory()
  const [error, setError] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

   
  const onSubmit = ({ firstName, lastName, email, phoneNumber, username, password, confirmPassword, address, abn, type, status}) => {
    // Clear error
    setError()

    // Ensure confirm password is the same as password
    if (password == confirmPassword) {
      // Signup
      signup({ firstName, lastName, email, phoneNumber, username, password, address, abn, type, status })
        .then( success  => {
          if (success) {
            history.push('/login')
          } else {
            setError('Something went wrong signing you up')
          }
        })
        .catch(err => setError(err.message))
    }
    else {
      setError('Passwords must match')
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading>Signup</Heading>
        {error && <ErrorNotification>{error}</ErrorNotification>}
        <FieldsContainer>
          <InputContainer>
            <label>First Name</label>
            <input type="text" {...register('firstName', { required: true })} />
            {errors.firstName && 'This field is required'}
          </InputContainer>
          <InputContainer>
            <label>Last Name</label>
            <input type="text" {...register('lastName', { required: true })} />
            {errors.lastName && 'This field is required'}
          </InputContainer>
          <InputContainer>
            <label>Email</label>
            <input type="email" {...register('email', { required: true })} />
            {errors.email && 'This field is required'}
          </InputContainer>
          <InputContainer>
            <label>Phone Number</label>
            <input type="text" {...register('phoneNumber', { required: true })} />
            {errors.phoneNumber && 'This field is required'}
          </InputContainer>
          <InputContainer>
            <label>Username</label>
            <input type="username" {...register('username', { required: true })} />
            {errors.username && 'This field is required'}
          </InputContainer>
          <InputContainer>
            <label>Postal Address</label>
            <input type="text" {...register('address', { required: true })} />
            {errors.address && 'This field is required'}
          </InputContainer>
          <InputContainer>
            <label>Password</label>
            <input type="password" {...register('password', { required: true })} />
            {errors.password && 'This field is required'}
          </InputContainer>
          <InputContainer>
            <label>Confirm Password</label>
            <input type="password" {...register('confirmPassword', { required: true })} />
            {errors.username && 'This field is required'}
          </InputContainer>
          <InputContainer>
            <label>ABN</label>
            <input type="text" {...register('abn', { required: true })} />
            {errors.abn && 'This field is required'}
          </InputContainer>
          <input type="hidden" {...register('type')} value="BUSINESS" />
          <input type="hidden" {...register('status')} value="ENABLED" />

        </FieldsContainer>
        <input type="submit" value="Signup" />
      </Form>
    </Container>
  )
}

export default LoginPage