import { observer } from 'mobx-react-lite'
import React from 'react'
import { Container, Toast, ToastContainer, Form, Button, Figure, FloatingLabel, Accordion } from 'react-bootstrap'

export default observer(function ActivityDetailedChat() {
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
                <Toast>
                  <Toast.Header>
                    <Figure>
                      <Figure.Image
                        width={50}
                        height={90}
                        style={{ borderRadius: '50%', padding: '10px' }}
                        alt="171x180"
                        src="/assets/user.png"
                      />
                    </Figure>
                    <strong className="me-auto">Matt</strong>
                    <small className="text-muted">Today at 5:42PM</small>
                  </Toast.Header>
                  <Toast.Body>How artistic!</Toast.Body>
                  <Toast.Body>
                    <Form.Control type="text" placeholder="Reply..."></Form.Control>
                  </Toast.Body>
                </Toast>

                <Toast>
                  <Toast.Header>
                    <Figure>
                      <Figure.Image
                        width={50}
                        height={90}
                        style={{ borderRadius: '50%', padding: '10px' }}
                        alt="171x180"
                        src="/assets/user.png"
                      />
                    </Figure>
                    <strong className="me-auto">Matt</strong>
                    <small className="text-muted">Today at 5:42PM</small>
                  </Toast.Header>
                  <Toast.Body>How artistic!</Toast.Body>
                  <Toast.Body>
                    <Form.Control type="text" placeholder="Reply..."></Form.Control>
                  </Toast.Body>
                </Toast>

                <Form>
                  <FloatingLabel controlId="floatingTextarea2" label="Comments">
                    <Form.Control as="textarea" placeholder="Leave a comment here" style={{ height: '100px' }} />
                  </FloatingLabel>

                  <Button>Add Reply</Button>
                </Form>
              </ToastContainer>
            </Container>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  )
})
