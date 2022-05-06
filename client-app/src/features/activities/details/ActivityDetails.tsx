import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Activity } from '../../../app/models/activity'

interface Props {
  activity: Activity
  cancelSelectActivity: () => void
  formOpen: (id: string) => void
}

export default function ActivityDetails({
  activity,
  formOpen,
  cancelSelectActivity,
}: Props) {
  return (
    <>
      <Card style={{ width: '35rem' }}>
        <Card.Img
          variant="top"
          src={`/assets/categoryImages/${activity.category}.jpg`}
        />
        <Card.Body>
          <Card.Title>{activity.title}</Card.Title>
          <Card.Text>{activity.description}</Card.Text>
          <Button variant="primary" onClick={() => formOpen(activity.id)}>
            Edit
          </Button>
          <Button variant="danger" onClick={() => cancelSelectActivity()}>
            cancel
          </Button>
        </Card.Body>
      </Card>
    </>
  )
}
