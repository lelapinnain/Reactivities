import React from 'react'

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

function App() {
  const { key } = useLocation()
  
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
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
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  )
}

export default observer(App)
