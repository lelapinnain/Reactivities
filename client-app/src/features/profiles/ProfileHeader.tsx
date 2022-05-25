import { observer } from 'mobx-react-lite'
import { Col, Container, Row, Image, Stack, Button, Alert } from 'react-bootstrap'
import { Profile } from '../../app/models/profile'

interface Props {
  profile: Profile
}

export default observer(function ProfileHeader({ profile }: Props) {
  return (
    <Alert variant="light">
      <Container>
        <Row>
          <Col xs={1}>
            {' '}
            <Image width={100} height={100} thumbnail={false} roundedCircle src={profile.image || '/assets/user.png'} />
          </Col>
          <Col xs={2}>
            <Stack gap={3}>
              <div></div>
              <div></div>
              <div>
                <h3>{profile.displayName}</h3>
              </div>
            </Stack>
          </Col>
          <Col xs={5}></Col>
          <Col xs={4}>
            {' '}
            <Container style={{ float: 'right' }}>
              <Row>
                <Col>
                  <h2>5 Followers</h2>
                </Col>
                <Col>
                  <h2>42 Following</h2>
                </Col>
              </Row>
              <hr></hr>
              <Row>
                <Button variant="outline-primary">Follwing</Button>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </Alert>
  )
})
