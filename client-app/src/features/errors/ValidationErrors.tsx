import React from 'react'
import { Alert } from 'react-bootstrap'

interface Props {
  errors: any
}

export default function ValidationErrors({ errors }: Props) {
  return (
    <Alert variant="danger">
      {errors && (
        <ul>
          {errors.map((err: any, i: any) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}
    </Alert>
  )
}
