import { observer } from 'mobx-react-lite'
import { SyntheticEvent, useEffect, useState } from 'react'
import { Button, ButtonGroup, Col, Container, Figure, Row, Tab } from 'react-bootstrap'
import PhotoUploadWidget from '../../app/common/ImageUpload/PhotoUploadWidget'
import { Photo, Profile } from '../../app/models/profile'
import { useStore } from '../../app/stores/store'

interface Props {
  profile: Profile
}

export default observer(function ProfilePhotos({ profile }: Props) {
  const {
    profileStore: { isCurrentUser, uploadPhoto, uploading, loading, setMainPhoto, deletePhoto },
  } = useStore()
  const [addPhotoMode, setAddPhotoMode] = useState(false)
  const [target, setTarget] = useState('')

  function handlePhotoUpload(file: Blob) {
    uploadPhoto(file).then(() => setAddPhotoMode(false))
  }

  function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
    setTarget(e.currentTarget.name)
    setMainPhoto(photo)
  }

  function handleDeletePhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
    setTarget(e.currentTarget.name)
    deletePhoto(photo)
  }
  useEffect(() => {}, [addPhotoMode])

  return (
    <>
      <h2>Images</h2>

      <Tab.Pane eventKey="Photos">
        <Container>
          <Row>
            <Col xs={12}>
              {isCurrentUser && (
                <Button variant="primary" style={{ float: 'right' }} onClick={() => setAddPhotoMode(!addPhotoMode)}>
                  {addPhotoMode ? 'Cancel' : 'Add Photo'}
                </Button>
              )}
            </Col>
            <Col xs={12}>
              {addPhotoMode ? (
                <p>
                  <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />
                </p>
              ) : (
                <div>
                  {profile.photos!.map((img) => (
                    <>
                      <Figure key={img.id} style={{ margin: '5px' }}>
                        <Figure.Image
                          rounded
                          width={171}
                          height={180}
                          alt="171x180"
                          src={img.url || `/assets/user.png`}
                        />
                      </Figure>

                      {isCurrentUser && (
                        <ButtonGroup>
                          <Button
                            name={'main' + img.id}
                            disabled={img.isMain}
                            onClick={(e) => handleSetMainPhoto(img, e)}
                          >
                            Main
                          </Button>
                          <Button
                            variant="danger"
                            onClick={(e) => handleDeletePhoto(img, e)}
                            disabled={img.isMain}
                            name={img.id}
                          >
                            X
                          </Button>
                        </ButtonGroup>
                      )}
                    </>
                  ))}
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </Tab.Pane>
    </>
  )
})
