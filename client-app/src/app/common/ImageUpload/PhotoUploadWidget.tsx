import React, { useEffect, useState } from 'react'
import { Button, Container, Alert, Col, Row, ButtonGroup } from 'react-bootstrap'
import PhotoWidgetCropper from './PhotoWidgetCropper'
import PhotoWidgetDropzone from './PhotoWidgetDropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCancel } from '@fortawesome/free-solid-svg-icons'

interface Props {
  loading: boolean
  uploadPhoto: (file: Blob) => void
}

export default function PhotoUploadWidget({ loading, uploadPhoto }: Props) {
  const [files, setFiles] = useState<any>([])
  const [cropper, setCropper] = useState<Cropper>()

  function onCrop() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob!))
    }
  }

  //to dispose the files from memory
  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview))
    }
  }, [files])

  return (
    <Container>
      <Row>
        <Col xs={4}>
          <Alert>'Step 1 - Add Photo'</Alert>
          <PhotoWidgetDropzone setFiles={setFiles} />
        </Col>
        <Col xs={1} />
        <Col xs={4}>
          <Alert>Step 2 - Resize image</Alert>
          {files && files.length > 0 && <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />}
        </Col>
        <Col xs={1} />
        <Col xs={4}>
          <Alert>Step 3 - Preview & Upload</Alert>
          {files && files.length > 0 && (
            <>
              <div className="img-preview" style={{ minHeight: 200, overflow: 'hidden' }} />
              {/* <Button.Group widths={2}>
                            <Button loading={loading} onClick={onCrop} positive icon='check' />
                            <Button disabled={loading} onClick={() => setFiles([])} icon='close' />
                        </Button.Group> */}
              <ButtonGroup aria-label="Basic example">
                <Button onClick={onCrop} variant="secondary">
                  <FontAwesomeIcon icon={faCheck} />
                </Button>
                <Button onClick={() => setFiles([])} variant="secondary">
                  <FontAwesomeIcon icon={faCancel} />
                </Button>
              </ButtonGroup>
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}
