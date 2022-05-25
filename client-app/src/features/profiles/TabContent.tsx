import { observer } from 'mobx-react-lite'
import React from 'react'
import { Alert, Col, Nav, Row, Tab } from 'react-bootstrap'
import { Profile } from '../../app/models/profile'
import ProfileAbout from './ProfileAbout'
import ProfilePhotos from './ProfilePhotos'

interface Props {
  profile: Profile
}

export default observer(function TabContent({ profile }: Props) {
  const panes = [
    { item: 'Photos', render: <ProfilePhotos profile={profile} /> },
    { item: 'About', render: <ProfileAbout /> },
    { item: 'Events', render: <Tab.Pane eventKey="Events">Events</Tab.Pane> },
    { item: 'Followers', render: <Tab.Pane eventKey="Followers">Followers</Tab.Pane> },
    { item: 'Following', render: <Tab.Pane eventKey="Following">Following</Tab.Pane> },
  ]
  return (
    <Alert variant="light">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3} style={{ borderRight: '6px solid green' }}>
            {panes.map((pane) => (
              <Nav variant="tabs" key={pane.item} className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey={pane.item}>{pane.item}</Nav.Link>
                </Nav.Item>
              </Nav>
            ))}
          </Col>
          <Col sm={9}>
            {panes.map((pane) => (
              <Tab.Content key={pane.item}>{pane.render}</Tab.Content>
            ))}
          </Col>
        </Row>
      </Tab.Container>
    </Alert>
  )
})
