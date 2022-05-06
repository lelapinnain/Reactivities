import React from 'react'
import { Col, Container, Row, Card, Button } from 'react-bootstrap'
import { Activity } from '../../../app/models/activity'

interface Props {
  activities: Activity[]
  selectActivity: (id: string) => void
  deleteActivity: (id: string) => void
}

export default function ActivityList({
  activities,
  selectActivity,
  deleteActivity,
}: Props) {
  return (
    <>
      <Container>
        <Col>
          {activities.map((activity) => (
            <Card key={activity.id} style={{ margin: '10px' }}>
              <Card.Header>{activity.title}</Card.Header>
              <Card.Body>
                <Card.Title>{activity.venue}</Card.Title>
                <Card.Text> {activity.date.substring(0, 10)}</Card.Text>
                <Card.Text>{activity.description}</Card.Text>
                <Button
                  variant="primary"
                  style={{ float: 'right' }}
                  onClick={() => {
                    selectActivity(activity.id)
                  }}
                >
                  View
                </Button>
                <Button
                  variant="danger"
                  style={{ float: 'right' }}
                  onClick={() => {
                    deleteActivity(activity.id)
                  }}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Container>
    </>
  )
}
