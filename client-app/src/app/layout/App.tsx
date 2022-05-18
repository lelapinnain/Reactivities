import React, { useEffect } from 'react'

import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'

import NavBar from './NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { observer } from 'mobx-react-lite'
import { Route, Routes, useLocation } from 'react-router-dom'
import ActivityForm from '../../features/activities/form/ActivityForm'
import HomePage from '../../features/home/HomePage'
import ActivityDetails from '../../features/activities/details/ActivityDetails'
import TestErrors from '../../features/errors/TestError'
import NotFound from '../../features/errors/NotFound'
import ServerError from '../../features/errors/ServerError'
import LoginForm from '../../features/users/LoginForm'
import LoadingComponent from './LoadingComponent'
import { useStore } from '../stores/store'
import ModalContainer from '../common/modals/ModalContainer'

function App() {
  const { key } = useLocation()
  const { commonStore, userStore } = useStore()

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent />

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <ModalContainer />
      <NavBar />

      <Container style={{ marginTop: '7em' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activities" element={<ActivityDashboard />} />
          <Route path="/activities/:id" element={<ActivityDetails />} />
          <Route key={key} path="/createActivity" element={<ActivityForm />} />
          <Route key={key} path="/manage/:id" element={<ActivityForm />} />
          <Route path="/errors" element={<TestErrors />} />
          <Route path="/server-error" element={<ServerError />} />
          <Route path="/login" element={<LoginForm />} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  )
}

export default observer(App)
