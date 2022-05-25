import { Badge, Figure, ListGroup, Toast, ToggleButton } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Activity } from '../../../app/models/activity'
import { useStore } from '../../../app/stores/store'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faMapPin } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'
import ActivityListItemAttendee from './ActivityListItemAttendee'

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
        {activity.isCancelled && (
          <ToggleButton
            type="radio"
            value=" this activity is canceled"
            variant="outline-danger"
            name="radio"
            checked={true}
          >
            this activity is canceled
          </ToggleButton>
        )}
        <ListGroup.Item>
          <Figure as={Link} to={`/profiles/${activity.hostUsername}`}>
            <Figure.Image
              width={100}
              height={100}
              style={{ borderRadius: '50%', padding: '10px' }}
              alt="171x180"
              src={activity.host?.image || `assets/user.png`}
            />
          </Figure>
          <Badge pill as={Link} to={`/activities/${activity.id}`} bg="success">
            {' '}
            Hosted by
          </Badge>

          <Link to={`/profiles/${activity.hostUsername}`}>{activity.host?.displayName}</Link>

          <Toast bg={'info'}>
            <Toast.Header closeButton={false}>{activity.title}</Toast.Header>
          </Toast>
          {activity.isHost && (
            <Toast bg={'danger'}>
              <Toast.Header closeButton={false}>you are hosting this activity</Toast.Header>
            </Toast>
          )}

          {activity.isGoing && !activity.isHost && (
            <Toast bg={'success'}>
              <Toast.Header closeButton={false}>you are going to this activity</Toast.Header>
            </Toast>
          )}
        </ListGroup.Item>

        <ListGroup.Item>
          <FontAwesomeIcon icon={faClock} /> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
          <br />
          <FontAwesomeIcon icon={faMapPin} /> {activity.venue}
        </ListGroup.Item>
        <ListGroup.Item>
          <ActivityListItemAttendee attendees={activity.attendees!} />
        </ListGroup.Item>
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
