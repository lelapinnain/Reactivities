import React, { useState } from 'react'
import { useStore } from '../../app/stores/store'
import { Button, Col, Container, Row, Tab } from 'react-bootstrap'
import ProfileEditForm from './ProfileEditForm'
import { observer } from 'mobx-react-lite'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default observer(function ProfileAbout() {
  const { profileStore } = useStore()
  const { isCurrentUser, profile } = profileStore
  const [editMode, setEditMode] = useState(false)

  return (
    <Tab.Pane eventKey="About">
      <Container>
        <Row>
          <Col>
            <h3 style={{ float: 'left' }}>
              <FontAwesomeIcon icon={faUser} />
              {'  '}
              {`About ${profile?.displayName}`}
            </h3>

            {isCurrentUser && (
              <Button style={{ float: 'right' }} variant="primary" onClick={() => setEditMode(!editMode)}>
                {editMode ? 'Cancel' : 'Edit Profile'}
              </Button>
            )}
          </Col>
          {editMode ? (
            <ProfileEditForm setEditMode={setEditMode} />
          ) : (
            <span style={{ whiteSpace: 'pre-wrap' }}>{profile?.bio}</span>
          )}
          <Col></Col>
        </Row>
      </Container>
    </Tab.Pane>
  )
})
