import React from 'react'
import { useField } from 'formik'
import { Alert, Form } from 'react-bootstrap'

interface Props {
    placeholder: string
  name: string
  options: any
  label?: string
}

export default function SelectInput(props: Props) {
  const [field, meta, helpers] = useField(props.name)
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>{props.label}</Form.Label>

        <Form.Select
          {...props}
          {...field}
          onChange={(e) => {
            helpers.setValue(e.target.value)
          }}
        >
          {props.options.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </Form.Select>

        {meta.touched && meta.error ? <Alert variant={'danger'}>{meta.error}</Alert> : null}
      </Form.Group>
    </>
  )
}
