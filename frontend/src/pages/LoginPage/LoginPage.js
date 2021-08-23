import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'

import { useToken } from '../../hooks'
import { Container, Form, InputContainer, Heading, FieldsContainer } from './loginPageStyle'

const LoginPage = () => {
  const history = useHistory()
  const { setToken } = useToken()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = data => {
    // TODO: fetch that stuff!
    console.log(data)
    setToken('haha')
    history.push('/')
  }

  return <Container>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Heading>Login</Heading>
      <FieldsContainer>
        <InputContainer>
          <label>Email</label>
          <input type='email' {...register('email', { required: true })} />
          {errors.email && 'This field is required'}
        </InputContainer>
        <InputContainer>
          <label>Password</label>
          <input type='password' {...register('password', { required: true })} />
          {errors.password && 'This field is required'}
        </InputContainer>
      </FieldsContainer>
      <input type='submit' value='Login' />
    </Form>
  </Container>
}

export default LoginPage
