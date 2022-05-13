import React from 'react'
import { Col, Container, Figure, Form, ListGroup, Toast, ToastContainer, Accordion } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

export default observer(function ActivityDetailedSidebar() {
  return (
    <>
      <Accordion defaultActiveKey="0" flush style={{ marginTop: '10px' }}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>3 People Going</Accordion.Header>
          <Accordion.Body>
            <Container>
              <ToastContainer>
                <Toast style={{ position: 'relative' }}>
                  <Toast.Header closeButton={false}>
                    <Figure>
                      <Figure.Image
                        width={50}
                        height={90}
                        style={{ borderRadius: '50%', padding: '10px' }}
                        alt="171x180"
                        src="/assets/user.png"
                      />
                    </Figure>
                    <strong className="me-auto">Host</strong>
                    <small className="text-muted">Today at 5:42PM</small>
                  </Toast.Header>
                  <Toast.Body>1</Toast.Body>
                </Toast>
                <Toast style={{ position: 'relative' }}>
                  <Toast.Header closeButton={false}>
                    <Figure>
                      <Figure.Image
                        width={50}
                        height={90}
                        style={{ borderRadius: '50%', padding: '10px' }}
                        alt="171x180"
                        src="/assets/user.png"
                      />
                    </Figure>
                    <strong className="me-auto">Host</strong>
                    <small className="text-muted">Today at 5:42PM</small>
                  </Toast.Header>
                  <Toast.Body>2</Toast.Body>
                </Toast>
                <Toast style={{ position: 'relative' }}>
                  <Toast.Header closeButton={false}>
                    <Figure>
                      <Figure.Image
                        width={50}
                        height={90}
                        style={{ borderRadius: '50%', padding: '10px' }}
                        alt="171x180"
                        src="/assets/user.png"
                      />
                    </Figure>
                    <strong className="me-auto">Host</strong>
                    <small className="text-muted">Today at 5:42PM</small>
                  </Toast.Header>
                  <Toast.Body>3</Toast.Body>
                </Toast>
              </ToastContainer>
            </Container>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  )
})
