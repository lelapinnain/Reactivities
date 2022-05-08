import React from 'react'
import { Card, Button } from 'react-bootstrap'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { useStore } from '../../../app/stores/store'

export default function ActivityDetails() {
  const { acitivityStore } = useStore()
  const { selectedActivity: activity, openForm, cancelSelectedActivity } = acitivityStore
  if (!activity) return <LoadingComponent />
  return (
    <>
      <Card style={{ width: '35rem' }}>
        <Card.Img variant="top" src={`/assets/categoryImages/${activity.category}.jpg`} />
        <Card.Body>
          <Card.Title>{activity.title}</Card.Title>
          <Card.Text>{activity.description}</Card.Text>
          <Button variant="primary" onClick={() => openForm(activity.id)}>
            Edit
          </Button>
          <Button variant="danger" onClick={() => cancelSelectedActivity()}>
            cancel
          </Button>
        </Card.Body>
      </Card>
    </>
  )
}
