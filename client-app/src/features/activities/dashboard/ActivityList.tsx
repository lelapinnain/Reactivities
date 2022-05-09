import { observer } from 'mobx-react-lite'
import React from 'react'
import { Col, Container, Card, Button } from 'react-bootstrap'

import { Link } from 'react-router-dom'
import { useStore } from '../../../app/stores/store'

export default observer(function ActivityList() {
  const { acitivityStore } = useStore()
  const { deleteActivity, activitiesByDate, loading } = acitivityStore

  function handleActivityDelete(id: string) {
    deleteActivity(id)
  }
  return (
    <>
      <Container>
        <Col>
          {activitiesByDate.map((activity) => (
            <Card key={activity.id} style={{ margin: '10px' }}>
              <Card.Header>{activity.title}</Card.Header>
              <Card.Body>
                <Card.Title>{activity.venue}</Card.Title>
                <Card.Text> {activity.date}</Card.Text>
                <Card.Text>{activity.description}</Card.Text>
                <Link to={`/activities/${activity.id}`} style={{ float: 'right' }} className="btn btn-primary">
                  View
                </Link>
                {/* <Button variant="primary" style={{ float: 'right' }}  as={Link} to={`/activities/${activity.id}`}>
                  View
                </Button> */}
                <Button variant="danger" style={{ float: 'right' }} onClick={() => handleActivityDelete(activity.id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Container>
    </>
  )
})
