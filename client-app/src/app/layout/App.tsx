import React, { useEffect } from 'react'

import { Container } from 'react-bootstrap'

import NavBar from './NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import LoadingComponent from './LoadingComponent'
import { useStore } from '../stores/store'

import { observer } from 'mobx-react-lite'

function App() {
  const { acitivityStore } = useStore()

  useEffect(() => {
    acitivityStore.loadActivities()
  }, [acitivityStore])

  if (acitivityStore.loadingInitial) return <LoadingComponent />

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard activities={acitivityStore.activitiesByDate} />
      </Container>
    </>
  )
}

export default observer(App)
