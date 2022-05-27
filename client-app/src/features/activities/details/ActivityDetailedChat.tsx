import { Field, FieldProps, Form, Formik } from 'formik'
import { values } from 'mobx'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Container, Toast, ToastContainer, Button, Figure, FloatingLabel, Accordion } from 'react-bootstrap'
import TextArea from '../../../app/common/form/TextArea'
import { useStore } from '../../../app/stores/store'
import * as Yup from 'yup'
import { formatDistanceToNow } from 'date-fns'

interface Props {
  activityId: string
}
export default observer(function ActivityDetailedChat({ activityId }: Props) {
  const { commentStore } = useStore()

  function handleFormSubmit(values: any, resetForm: any) {
    commentStore.addComment(values).then(() => resetForm())
  }

  useEffect(() => {
    if (activityId) {
      commentStore.createHubConnection(activityId)
    }
    return () => {
      commentStore.clearComments()
    }
  }, [commentStore, activityId])

  return (
    <>
      <Accordion defaultActiveKey="0" flush style={{ marginTop: '10px' }}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Chat about this event</Accordion.Header>
          <Accordion.Body>
            <Container style={{ textAlign: 'center', border: 'none' }}>
              <h1>Chat about this event</h1>
            </Container>
            <Container>
              <ToastContainer>
                <>
                  {commentStore.comments.map((comment) => (
                    <Toast key={comment.id}>
                      <Toast.Header closeButton={false} style={{ height: '30px', margin: '5px' }}>
                        <Figure>
                          <Figure.Image
                            width={50}
                            height={50}
                            style={{ borderRadius: '50%', padding: '10px' }}
                            alt="171x180"
                            src={comment.image || '/assets/user.png'}
                          />
                        </Figure>
                        <strong className="me-auto">{comment.displayName}</strong>
                        <small className="text-muted">{formatDistanceToNow(comment.createdAt)} ago</small>
                      </Toast.Header>
                      <Toast.Body>{comment.body}</Toast.Body>
                    </Toast>
                  ))}
                </>
              </ToastContainer>
              <Formik
                onSubmit={(values, { resetForm }) => handleFormSubmit(values, resetForm)}
                initialValues={{ body: '' }}
                validationSchema={Yup.object({
                  body: Yup.string().required(),
                })}
              >
                {({ isSubmitting, isValid, handleSubmit }) => (
                  <Form className="ui form" onSubmit={handleSubmit}>
                    <Field name="body">
                      {(props: FieldProps) => (
                        <div style={{ position: 'relative' }}>
                          <h4>Comment</h4>
                          <textarea
                            style={{ margin: '10px' }}
                            placeholder="Enter your comment (Enter to submit, SHIFT + enter for new line)"
                            rows={2}
                            {...props.field}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && e.shiftKey) {
                                return
                              }
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault()
                                isValid && handleSubmit()
                              }
                            }}
                          />
                        </div>
                      )}
                    </Field>
                  </Form>
                )}
              </Formik>
            </Container>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  )
})
