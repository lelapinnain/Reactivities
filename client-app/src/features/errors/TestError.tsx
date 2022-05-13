import React, { useState } from 'react'
import { Button, ButtonGroup, Container } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ValidationErrors from './ValidationErrors'

export default function TestErrors() {
  const baseUrl = 'http://localhost:5000/api/'
  const navigate = useNavigate()
  const [errors, setErrors] = useState(null)
  function handleNotFound() {
    axios.get(baseUrl + 'buggy/not-found').catch((err) => console.log(err.response))
    navigate('./notfound')
  }

  function handleBadRequest() {
    axios.get(baseUrl + 'buggy/bad-request').catch((err) => console.log(err.response))
  }

  function handleServerError() {
    axios.get(baseUrl + 'buggy/server-error').catch((err) => console.log(err.response))
    navigate('/server-error')
  }

  function handleUnauthorised() {
    axios.get(baseUrl + 'buggy/unauthorised').catch((err) => console.log(err.response))
  }

  function handleBadGuid() {
    axios.get(baseUrl + 'activities/notaguid').catch((err) => console.log(err.response))
  }

  function handleValidationError() {
    axios.post(baseUrl + 'activities', {}).catch((err) => setErrors(err))
  }

  return (
    <>
      <h1>Test Error component</h1>
      <Container>
        <ButtonGroup>
          <Button onClick={handleNotFound} className="btn btn-primary">
            Not Found
          </Button>
          <Button onClick={handleBadRequest} className="btn btn-primary">
            Bad Request
          </Button>
          <Button onClick={handleValidationError} className="btn btn-primary">
            Validation Error
          </Button>
          <Button onClick={handleServerError} className="btn btn-primary">
            Server Error
          </Button>
          <Button onClick={handleUnauthorised} className="btn btn-primary">
            UnAutorized
          </Button>
          <Button onClick={handleBadGuid} className="btn btn-primary">
            Bad GUID
          </Button>
        </ButtonGroup>
      </Container>
      {errors && <ValidationErrors errors={errors} />}
    </>
  )
}
