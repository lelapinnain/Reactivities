import { observer } from 'mobx-react-lite'
import React from 'react'
import { Col, Container, ListGroup } from 'react-bootstrap'
import { Activity } from '../../../app/models/activity'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faCalendar, faMarker } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'
interface Props {
  activity: Activity
}

export default observer(function ActivityDetailedInfo({ activity }: Props) {
  return (
    <ListGroup style={{ marginTop: '10px' }}>
      <ListGroup.Item>
        <Container>
          <Col width={1}>
            <FontAwesomeIcon icon={faInfo} size="lg" />
          </Col>
          <Col width={15}>
            <p>{activity.description}</p>
          </Col>
        </Container>
      </ListGroup.Item>
      <ListGroup.Item>
        <Container style={{ verticalAlign: 'middle' }}>
          <Col width={1}>
            <FontAwesomeIcon icon={faCalendar} size="lg" />
          </Col>
          <Col width={15}>
            <span>{format(activity.date!, 'dd MMM yyyy h:mm aa')}</span>
          </Col>
        </Container>
      </ListGroup.Item>
      <ListGroup.Item>
        <Container style={{ verticalAlign: 'middle' }}>
          <Col width={1}>
            <FontAwesomeIcon icon={faMarker} size="lg" />
          </Col>
          <Col width={11}>
            <span>
              {activity.venue}, {activity.city}
            </span>
          </Col>
        </Container>
      </ListGroup.Item>
    </ListGroup>
  )
})
