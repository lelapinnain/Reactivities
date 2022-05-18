import React from 'react'
import { useField } from 'formik'
import { Alert, Form } from 'react-bootstrap'

interface Props {
  placeholder: string
  name: string
  label?: string
  type?: string
}

export default function TextInput(props: Props) {
  const [field, meta] = useField(props.name)
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>{props.label}</Form.Label>
        <Form.Control type="text" {...props} {...field} isInvalid={meta.touched && !meta.error} />
        {meta.touched && meta.error ? <Alert variant={'danger'}>{meta.error}</Alert> : null}
      </Form.Group>
    </>
  )
}
