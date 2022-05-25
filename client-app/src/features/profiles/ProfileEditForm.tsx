import { Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../app/stores/store'
import * as Yup from 'yup'
import TextInput from '../../app/common/form/TextInput'
import TextArea from '../../app/common/form/TextArea'
import { Button } from 'react-bootstrap'

interface Props {
  setEditMode: (editMode: boolean) => void
}
export default observer(function ProfileEditForm({ setEditMode }: Props) {
  const {
    profileStore: { profile, updateProfile },
  } = useStore()
  return (
    <Formik
      initialValues={{ displayName: profile?.displayName, bio: profile?.bio }}
      enableReinitialize
      onSubmit={(values, { setErrors }) => updateProfile(values).then(() => setEditMode(false))}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        bio: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, isValid, dirty }) => (
        <>
          <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
            <TextInput name="displayName" label="Display Name" placeholder="display name..." />

            <TextArea name="bio" label="Bio" placeholder="Bio..." rows={3} />

            <Button disabled={!isValid || !dirty} variant="primary" type="submit">
              Update Profile
            </Button>
          </Form>
        </>
      )}
    </Formik>
  )
})
