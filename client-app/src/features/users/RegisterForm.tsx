import { Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import * as Yup from 'yup'
import React from 'react'
import { Alert, Button } from 'react-bootstrap'
import TextInput from '../../app/common/form/TextInput'
import { useStore } from '../../app/stores/store'
import ValidationErrors from '../errors/ValidationErrors'

export default observer(function RegisterForm() {
  const { userStore } = useStore()
  return (
    <Formik
      initialValues={{ username: '', password: '', email: '', displayName: '', error: null }}
      enableReinitialize
      onSubmit={(values, { setErrors }) => userStore.register(values).catch((error) => setErrors({ error }))}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <>
          <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
            <TextInput name="username" label="User Name" placeholder="username" />
            <TextInput name="displayName" label="Display Name" placeholder="display name" />

            <TextInput name="password" label="Password" placeholder="passowrd" type="password" />
            <TextInput name="email" label="Email" placeholder="email" type="text" />

            <Button disabled={!isValid || !dirty} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          {errors.error && (
            <Alert variant={'danger'} style={{ marginTop: '10px' }}>
              {/* {errors.error} */}
              <ValidationErrors errors={errors.error} />
            </Alert>
          )}
        </>
      )}
    </Formik>
  )
})
