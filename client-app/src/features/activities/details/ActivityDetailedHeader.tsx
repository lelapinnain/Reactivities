import { format } from 'date-fns'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Button, Image, ListGroup, ToggleButton } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Activity } from '../../../app/models/activity'
import ActivityStore from '../../../app/stores/activityStore'
import { useStore } from '../../../app/stores/store'

const activityImageStyle = {
  filter: 'brightness(30%)',
}

interface Props {
  activity: Activity
}

export default observer(function ActivityDetailedHeader({ activity }: Props) {
  const {
    acitivityStore: { updateAttendance, cancelActivityToggle, loading },
  } = useStore()

  return (
    <>
      <ListGroup style={{ width: '100%' }}>
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
        <ListGroup.Item style={{ backgroundColor: 'transparent', color: 'white', padding: '0' }}>
          <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle} />
          <ListGroup.Item
            style={{
              position: 'absolute',
              bottom: '5%',
              left: '5%',
              height: 'auto',
              color: 'white',
              backgroundColor: 'transparent',
              border: 'none',
            }}
          >
            <ListGroup.Item style={{ backgroundColor: 'transparent', color: 'white', border: 'none' }}>
              <div>{activity.title}</div>

              <p>{format(activity.date!, 'dd MMM yyyy h:mm aa')}</p>
              <p>
                Hosted by <strong>{activity.host?.displayName}</strong>
              </p>
            </ListGroup.Item>
          </ListGroup.Item>
        </ListGroup.Item>
        <ListGroup.Item>
          {activity.isHost ? (
            <>
              <Link to={`/manage/${activity.id}`} style={{ float: 'right' }} className="btn btn-secoundary">
                Manage Event
              </Link>
              <Button onClick={cancelActivityToggle} style={{ float: 'left' }} className="btn btn-secoundary">
                {activity.isCancelled ? 'Reactivate' : 'Cancel Event'}
              </Button>
            </>
          ) : activity.isGoing ? (
            <Button onClick={updateAttendance} style={{ margin: '3px' }} className="btn btn-danger">
              Cancel
            </Button>
          ) : (
            <Button onClick={updateAttendance} className="btn btn-secoundary">
              Join Activity
            </Button>
          )}
        </ListGroup.Item>
      </ListGroup>
    </>
  )
})
