import { observer } from 'mobx-react-lite'
import React from 'react'
import { Modal } from 'react-bootstrap'
import { useStore } from '../../stores/store'

export default observer(function ModalContainer() {
  const { modalStore } = useStore()
  return (
    <>
      <Modal show={modalStore.modal.open} onHide={modalStore.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalStore.modal.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalStore.modal.body}</Modal.Body>
      </Modal>
    </>
  )
})
