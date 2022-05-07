import React from 'react'
import { Spinner } from 'react-bootstrap'

interface Props {
  variant?: string
}

export default function LoadingComponent({ variant = 'dark' }: Props) {
  return (
    <>
      <Spinner
        animation="grow"
        variant={variant}
        style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />
    </>
  )
}
