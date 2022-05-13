import { useField } from 'formik'
import React from 'react'
import { Form, Alert } from 'react-bootstrap'

import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

export default function DatePickr(props: Partial<ReactDatePickerProps>) {
  const [field, meta, helpers] = useField(props.name!)
  return (
    <Form.Group className="mb-3">
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(value) => helpers.setValue(value)}
      />
      {meta.touched && meta.error ? <Alert variant={'danger'}>{meta.error}</Alert> : null}
    </Form.Group>
  )
}
