import React from 'react'
import { Badge, Button, Card, Figure, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Activity } from '../../../app/models/activity'
import { useStore } from '../../../app/stores/store'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faMapPin } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'

interface Props {
  activity: Activity
}

export default function ActivityListItem({ activity }: Props) {
  const { acitivityStore } = useStore()
  const { deleteActivity } = acitivityStore

  function handleActivityDelete(id: string) {
    deleteActivity(id)
  }
  return (
    <>
      <ListGroup style={{ padding: '4px' }}>
        <ListGroup.Item>
          <Figure>
            <Figure.Image
              width={100}
              height={100}
              style={{ borderRadius: '50%', padding: '10px' }}
              alt="171x180"
              src="assets/user.png"
            />
          </Figure>
          <Badge as={Link} to={`/activities/${activity.id}`} bg="secondary">
            {' '}
            {activity.title}
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item>
          <FontAwesomeIcon icon={faClock} /> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
          <br />
          <FontAwesomeIcon icon={faMapPin} /> {activity.venue}
        </ListGroup.Item>
        <ListGroup.Item variant="secondary">here</ListGroup.Item>
        <ListGroup.Item>
          {activity.description}
          <Link to={`/activities/${activity.id}`} style={{ float: 'right' }} className="btn btn-primary">
            View
          </Link>

          {/* <Button variant="danger" style={{ float: 'right' }} onClick={() => handleActivityDelete(activity.id)}>
            Delete
          </Button> */}
        </ListGroup.Item>
      </ListGroup>
    </>
  )
}
