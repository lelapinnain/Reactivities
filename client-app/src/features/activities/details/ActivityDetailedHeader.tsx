import { format } from 'date-fns'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Button, Image, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Activity } from '../../../app/models/activity'

const activityImageStyle = {
  filter: 'brightness(30%)',
}

interface Props {
  activity: Activity
}

export default observer(function ActivityDetailedHeader({ activity }: Props) {
  return (
    <>
      <ListGroup style={{ width: '100%' }}>
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
                Hosted by <strong>Bob</strong>
              </p>
            </ListGroup.Item>
          </ListGroup.Item>
        </ListGroup.Item>
        <ListGroup.Item>
          <Button className="btn btn-secoundary">Join Activity</Button>
          <Button className="btn btn-danger" style={{ margin: '3px' }}>
            Cancel
          </Button>
          {/* <Button color="orange" style={{ float: 'right' }}>
            Manage Event
          </Button> */}

          <Link to={`/manage/${activity.id}`} style={{ float: 'right' }} className="btn btn-secoundary">
            Manage Event
          </Link>
        </ListGroup.Item>
      </ListGroup>
    </>
  )
})
