import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { useStore } from '../../../app/stores/store'
import ActivityDetailedChat from './ActivityDetailedChat'
import ActivityDetailedHeader from './ActivityDetailedHeader'
import ActivityDetailedInfo from './ActivityDetailedInfo'
import ActivityDetailedSideBar from './ActivityDetailedSideBar'

export default observer(function ActivityDetails() {
  const { acitivityStore } = useStore()
  const { selectedActivity: activity, loadActivity, loadingInitial } = acitivityStore
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (id) {
      loadActivity(id)
    }
  }, [id, loadActivity])

  if (loadingInitial || !activity) return <LoadingComponent />
  return (
    <>
      <Container>
        <Row>
          <Col style={{ width: '10px' }}>
            <ActivityDetailedHeader activity={activity} />
            <ActivityDetailedInfo activity={activity} />
            <ActivityDetailedChat />
          </Col>
          <Col style={{ width: '10px' }}>
            <ActivityDetailedSideBar />
          </Col>
        </Row>
      </Container>
      {/* <Card style={{ width: '35rem' }}>
        <Card.Img variant="top" src={`/assets/categoryImages/${activity.category}.jpg`} />
        <Card.Body>
          <Card.Title>{activity.title}</Card.Title>
          <Card.Text>{activity.description}</Card.Text>
          <Link to={`/manage/${activity.id}`} style={{ float: 'right' }} className="btn btn-primary">
            Edit
          </Link>
          <Link to={`/activities`} style={{ float: 'right' }} className="btn btn-danger">
            cancel
          </Link>
        </Card.Body>
      </Card> */}
    </>
  )
})
