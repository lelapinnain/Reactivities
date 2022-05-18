import { title } from 'process'
import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { useStore } from '../../app/stores/store'
import LoginForm from '../users/LoginForm'
import RegisterForm from '../users/RegisterForm'

export default function HomePage() {
  const { modalStore } = useStore()
  return (
    <Container>
      <h1>Home Page</h1>
      <Button
        variant="primary"
        onClick={() => {
          modalStore.openModal(<LoginForm />, 'Login')
        }}
      >
        Login
      </Button>
      <Button
        variant="secoundary"
        onClick={() => {
          modalStore.openModal(<RegisterForm />, 'Register')
        }}
      >
        Register
      </Button>
    </Container>
  )
}
