import { observer } from 'mobx-react-lite'
import React from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { Activity } from '../../../app/models/activity'
import { useStore } from '../../../app/stores/store'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

interface Props {
  activities: Activity[]
}

export default observer(function ActivityDashboard({ activities }: Props) {
  const { acitivityStore } = useStore()
  const { selectedActivity, editMode } = acitivityStore
  return (
    <>
      <Container>
        <Row>
          <Col sm={5}>
            <Button
              variant="primary"
              onClick={() => acitivityStore.openForm()}
              style={{ width: '30px', float: 'right' }}
            >
              +
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <ActivityList />
          </Col>
          <Col sm={6}>
            {selectedActivity && !editMode && <ActivityDetails />}
            {editMode && <ActivityForm />}
          </Col>
        </Row>
      </Container>
    </>
  )
})
