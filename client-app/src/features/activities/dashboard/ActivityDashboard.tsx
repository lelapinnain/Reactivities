import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { useStore } from '../../../app/stores/store'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityFilters from './ActivityFilters'
import ActivityList from './ActivityList'

export default observer(function ActivityDashboard() {
  const { acitivityStore } = useStore()
  const { selectedActivity, editMode, activityRegistry, loadActivities, loadingInitial } = acitivityStore

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities()
  }, [acitivityStore, activityRegistry, loadActivities])

  if (loadingInitial) return <LoadingComponent />
  return (
    <>
      <Container>
        <Row>
          <Col sm={5}>
            <Link to={`/createActivity`} style={{ float: 'right' }} className="btn btn-secoundary">
              +
            </Link>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <ActivityList />
          </Col>
          <Col sm={6}>
            <ActivityFilters />
          </Col>
        </Row>
      </Container>
    </>
  )
})
