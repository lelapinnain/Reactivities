import React, { useState } from 'react'
import { Button, Container, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const [show, setShow] = useState(true)
  const navigate = useNavigate()
  const handleClose = () => navigate('/activities')

  return (
    <Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Not Found</Modal.Title>
        </Modal.Header>
        <Modal.Body>Opps,Could't find what you looking for !</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Go Back...
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
