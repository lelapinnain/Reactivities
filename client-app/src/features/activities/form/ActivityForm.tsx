import { observer } from 'mobx-react-lite'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Card, Button, Form, Spinner } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { useStore } from '../../../app/stores/store'
import { v4 as uuid } from 'uuid'

export default observer(function ActivityForm() {
  const { acitivityStore } = useStore()
  const navigate = useNavigate()

  const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = acitivityStore
  const [activity, setActivity] = useState({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  })
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!))
  }, [id, loadActivity])

  function handleSubmit(e: any) {
    e.preventDefault()
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

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    setActivity({ ...activity, [name]: value })
  }
  if (loadingInitial) return <LoadingComponent />
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
            {id ? (
              <Link to={`/activities/${id}`} style={{ float: 'right' }} className="btn btn-secoundary">
                Cancel
              </Link>
            ) : (
              <Link to={`/activities`} style={{ float: 'right' }} className="btn btn-secoundary">
                Cancel
              </Link>
            )}

            <Button variant="primary" type="submit" style={{ float: 'right' }}>
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
    </>
  )
})
