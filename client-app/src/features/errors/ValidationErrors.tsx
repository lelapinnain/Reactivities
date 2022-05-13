import React from 'react'
import { Alert } from 'react-bootstrap'

interface Props {
  errors: string[] | null
}

export default function ValidationErrors({ errors }: Props) {
  return (
    <Alert variant="danger">
      {errors && (
        <ul>
          {errors.map((err: any, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}
    </Alert>
  )
}
