import { Container, Figure, Toast, ToastContainer, Accordion, Badge } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { Activity } from '../../../app/models/activity'

interface Props {
  activity: Activity
}

export default observer(function ActivityDetailedSidebar({ activity: { attendees, host } }: Props) {
  if (!attendees) return null
  return (
    <>
      <Accordion defaultActiveKey="0" flush style={{ marginTop: '10px' }}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            {attendees.length} {attendees.length === 1 ? 'Person' : 'People'} Going
          </Accordion.Header>
          <Accordion.Body>
            <Container>
              <ToastContainer>
                {attendees.map((attendee) => (
                  <Toast key={attendee.username} style={{ position: 'relative' }}>
                    <Toast.Header closeButton={false}>
                      <Figure>
                        <Figure.Image
                          width={50}
                          height={90}
                          style={{ borderRadius: '50%', padding: '10px' }}
                          alt="171x180"
                          src={attendee.image || '/assets/user.png'}
                        />
                      </Figure>
                      <strong className="me-auto">{attendee.displayName}</strong>
                      {attendee.username === host?.username && (
                        <h4>
                          {' '}
                          <Badge pill bg="success">
                            Host
                          </Badge>
                        </h4>
                      )}
                    </Toast.Header>
                    {/* <Toast.Body>1</Toast.Body> */}
                  </Toast>
                ))}
              </ToastContainer>
            </Container>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  )
})
