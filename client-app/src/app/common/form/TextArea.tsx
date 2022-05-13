import React from 'react'
import { useField } from 'formik'
import { Alert, Form } from 'react-bootstrap'

interface Props {
  placeholder: string
  name: string
  rows: number
  label?: string
}

export default function TextArea(props: Props) {
  const [field, meta, helpers] = useField(props.name)
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>{props.label}</Form.Label>
        <Form.Control as="textarea" type="text" {...props} {...field} isValid={meta.touched && !meta.error} />
        {meta.touched && meta.error ? <Alert variant={'danger'}>{meta.error}</Alert> : null}
      </Form.Group>
    </>
  )
}
