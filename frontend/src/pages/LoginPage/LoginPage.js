import React from 'react'
import { useForm } from 'react-hook-form'

import { Container, Form, InputContainer, Heading, FieldsContainer } from './loginPageStyle'

const LoginPage = () => {
  const {register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = data => console.log('formd', data)

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
