import React from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { Activity } from '../../../app/models/activity'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

interface Props {
  activities: Activity[]
  selectedActivety: Activity | undefined
  selectActivity: (id: string) => void
  cancelSelectActivity: () => void
  editMode: boolean
  formOpen: () => void
  formClose: () => void
  createOrEdit: (activity: Activity) => void
  deleteActivity: (id: string) => void
}

export default function ActivityDashboard({
  activities,
  selectedActivety,
  selectActivity,
  cancelSelectActivity,
  editMode,
  formOpen,
  formClose,
  createOrEdit,
  deleteActivity,
}: Props) {
  return (
    <>
      <Container>
        <Row>
          <Col sm={5}>
            <Button
              variant="primary"
              onClick={formOpen}
              style={{ width: '30px', float: 'right' }}
            >
              +
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <ActivityList
              activities={activities}
              selectActivity={selectActivity}
              deleteActivity={deleteActivity}
            />
          </Col>
          <Col sm={6}>
            {selectedActivety && !editMode && (
              <ActivityDetails
                activity={selectedActivety}
                cancelSelectActivity={cancelSelectActivity}
                formOpen={formOpen}
              />
            )}
            {editMode && (
              <ActivityForm
                formClose={formClose}
                activity={selectedActivety}
                createOrEdit={createOrEdit}
                
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}
