import { observer } from 'mobx-react-lite'
import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Profile } from '../../app/models/profile'

interface Props {
  profile: Profile
}

export default observer(function ProfileCard({ profile }: Props) {
  return (
    <>
      <Card style={{ width: '18rem' }} as={Link} to={`/profiles/${profile.username}`}>
        <Card.Img variant="top" src={profile.image || '/assets/user.png'} />
        <Card.Body>
          <Card.Title>{profile.displayName}</Card.Title>
          <Card.Text>{profile.bio}</Card.Text>
        </Card.Body>
      </Card>
    </>
  )
})
