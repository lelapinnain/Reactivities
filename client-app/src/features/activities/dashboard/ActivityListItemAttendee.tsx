import { observer } from 'mobx-react-lite'
import React from 'react'
import { Figure, ListGroup, OverlayTrigger, Popover } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Profile } from '../../../app/models/profile'
import ProfileCard from '../../profiles/ProfileCard'

interface Props {
  attendees: Profile[]
}

export default observer(function ActivityListItemAttendee({ attendees }: Props) {
  const renderTooltip = (attendee: Profile) => (
    <Popover id="popover-contained">
      <Popover.Body>
        <ProfileCard profile={attendee} />
      </Popover.Body>
    </Popover>
  )
  return (
    <>
      <ListGroup horizontal>
        {attendees.map((attendee) => (
          <OverlayTrigger
            key={attendee.username}
            placement="right"
            delay={{ show: 500, hide: 1000 }}
            overlay={renderTooltip(attendee)}
          >
            <ListGroup.Item style={{ border: 'none' }} as={Link} to={`/profiles/${attendee.username}`}>
              {' '}
              <img
                width={70}
                height={70}
                style={{ borderRadius: '50%', padding: '10px' }}
                alt="171x180"
                src={attendee.image || 'assets/user.png'}
              />
            </ListGroup.Item>
          </OverlayTrigger>
        ))}
      </ListGroup>
    </>
  )
})
