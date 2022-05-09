import React from 'react'

import { Container } from 'react-bootstrap'

import NavBar from './NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { observer } from 'mobx-react-lite'
import { Route, Routes, useLocation } from 'react-router-dom'
import ActivityForm from '../../features/activities/form/ActivityForm'
import HomePage from '../../features/home/HomePage'
import ActivityDetails from '../../features/activities/details/ActivityDetails'

function App() {
  const { key } = useLocation()
  return (
    <>
      <NavBar />

      <Container style={{ marginTop: '7em' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activities" element={<ActivityDashboard />} />
          <Route path="/activities/:id" element={<ActivityDetails />} />
          <Route key={key} path="/createActivity" element={<ActivityForm />} />
          <Route key={key} path="/manage/:id" element={<ActivityForm />} />
        </Routes>
      </Container>
    </>
  )
}

export default observer(App)
