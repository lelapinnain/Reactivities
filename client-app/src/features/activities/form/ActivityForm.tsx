import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { Card, Button, Spinner } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { useStore } from '../../../app/stores/store'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TextInput from '../../../app/common/form/TextInput'
import TextArea from '../../../app/common/form/TextArea'
import SelectInput from '../../../app/common/form/SelectInput'
import { catOptions } from '../../../app/common/options/catoptions'
import DatePickr from '../../../app/common/form/DatePicker'
import { Activity } from '../../../app/models/activity'
import { v4 as uuid } from 'uuid'

export default observer(function ActivityForm() {
  const { acitivityStore } = useStore()
  const navigate = useNavigate()

  const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = acitivityStore
  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: null,
    city: '',
    venue: '',
  })
  const activitySchema = Yup.object().shape({
    title: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    category: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    description: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    date: Yup.date(),
    city: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    venue: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  })

  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!))
  }, [id, loadActivity])

  function handleFormSubmit(activity: Activity) {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      }
      createActivity(newActivity).then(() => {
        navigate(`/activities`)
      })
    } else {
      updateActivity(activity).then(() => {
        navigate(`/activities/${id}`)
      })
    }
  }

  if (loadingInitial) return <LoadingComponent />
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={activity}
        validationSchema={activitySchema}
        onSubmit={(values) => {
          handleFormSubmit(values)
        }}
      >
        {({ values: activity, handleSubmit, handleChange, isValid, isSubmitting, dirty }) => (
          <Card style={{ margin: '20px' }}>
            <Card.Header>Add</Card.Header>
            <Card.Body>
              <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                <TextInput name="title" label="Title" placeholder="Title" />

                <TextArea name="description" label="description" rows={4} placeholder="description" />

                <SelectInput options={catOptions} name="category" label="category" placeholder="category" />

                <DatePickr
                  name="date"
                  placeholderText="Date"
                  showTimeSelect
                  timeCaption="time"
                  dateFormat="dd-mm-yyyy h:mm:aa"
                />

                <TextInput name="city" label="city" placeholder="city" />

                <TextInput name="venue" label="venue" placeholder="venue" />

                {id ? (
                  <Link to={`/activities/${id}`} style={{ float: 'right' }} className="btn btn-secoundary">
                    Cancel
                  </Link>
                ) : (
                  <Link to={`/activities`} style={{ float: 'right' }} className="btn btn-secoundary">
                    Cancel
                  </Link>
                )}

                <Button
                  disabled={isSubmitting || !dirty || !isValid}
                  variant="primary"
                  type="submit"
                  style={{ float: 'right' }}
                >
                  Submit
                </Button>
                {loading && (
                  <Button variant="primary" disabled>
                    <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                    Loading...
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Card>
        )}
      </Formik>
    </>
  )
})
