import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Card, Button, Form, Spinner } from 'react-bootstrap'
import { Activity } from '../../../app/models/activity'

interface Props {
  activity: Activity | undefined
  formClose: () => void
  createOrEdit: (activity: Activity) => void
  submitting: boolean
}

export default function ActivityForm({ activity: selectedActivity, createOrEdit, submitting, formClose }: Props) {
  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  }
  const [activity, setActivity] = useState(initialState)

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
    createOrEdit(activity)
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    setActivity({ ...activity, [name]: value })
  }
  return (
    <>
      <Card style={{ margin: '20px' }}>
        <Card.Header>Add</Card.Header>
        <Card.Body>
          <Form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
            <Form.Group className="mb-2" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                value={activity.title}
                name="title"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter description"
                value={activity.description}
                name="description"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={activity.category}
                name="category"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Date"
                value={activity.date}
                name="date"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                value={activity.city}
                name="city"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="venue">
              <Form.Label>Venue</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Venue"
                value={activity.venue}
                name="venue"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="secoundary" style={{ float: 'right' }} onClick={() => formClose()}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" style={{ float: 'right' }}>
              Submit
            </Button>
            {submitting && (
              <Button variant="primary" disabled>
                <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                Loading...
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}
