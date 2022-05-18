import { makeAutoObservable } from 'mobx'

interface Modal {
  open: boolean
  body: JSX.Element | null
  title: string
}
export default class ModalStore {
  modal: Modal = {
    open: false,
    body: null,
    title: '',
  }

  constructor() {
    makeAutoObservable(this)
  }

  openModal = (content: JSX.Element, title: string) => {
    this.modal.open = true
    this.modal.body = content
    this.modal.title = title
  }
  closeModal = () => {
    this.modal.open = false
    this.modal.body = null
    this.modal.title = ''
  }
}
