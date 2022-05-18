import { makeAutoObservable, runInAction } from 'mobx'
import agent from '../API/agent'
import { User, UserFormValues } from '../models/users'
import { history } from '../..'

import { store } from './store'

export default class UserStore {
  user: User | null = null

  constructor() {
    makeAutoObservable(this)
  }

  get isLoggedIn() {
    return !!this.user
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds)
      console.log(user)
      store.commonStore.setToken(user.token)
      runInAction(() => (this.user = user))
      history.push('/activities')
      store.modalStore.closeModal()
    } catch (error) {
      throw error
    }
  }

  logout = () => {
    store.commonStore.setToken(null)
    window.localStorage.removeItem('jwt')
    this.user = null
    history.push('/')
  }

  getUser = async () => {
    try {
      const user = await agent.Account.current()
      runInAction(() => (this.user = user))
    } catch (error) {
      console.log(error)
    }
  }

  register = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.register(creds)
      store.commonStore.setToken(user.token)
      runInAction(() => (this.user = user))
      history.push('/activities')
       store.modalStore.closeModal()
    } catch (error) {
      throw error
    }
  }
}
