import { Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'

import React from 'react'
import { Alert, Button } from 'react-bootstrap'
import TextInput from '../../app/common/form/TextInput'
import { useStore } from '../../app/stores/store'

export default observer(function LoginForm() {
  const { userStore } = useStore()
  return (
    <Formik
      initialValues={{ username: '', password: '', error: null }}
      enableReinitialize
      onSubmit={(values, { setErrors }) =>
        userStore.login(values).catch((err) => setErrors({ error: 'Invalid Credentials' }))
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <>
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <TextInput name="username" label="User Name" placeholder="username" />
            <TextInput name="password" label="Password" placeholder="passowrd" type="password" />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          {errors.error && (
            <Alert variant={'danger'} style={{ marginTop: '10px' }}>
              {errors.error}
            </Alert>
          )}
        </>
      )}
    </Formik>
  )
})
