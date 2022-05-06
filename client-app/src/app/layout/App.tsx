import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import {v4 as uuid} from 'uuid';
import { Container } from 'react-bootstrap'

import NavBar from './NavBar'
import { Activity } from '../models/activity'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivety, setSelectedActivety] = useState<
    Activity | undefined
  >(undefined)
  const [editMode, setEditMode] = useState(false)

  function handleSelectActivity(id: string) {
    setSelectedActivety(activities.find((x) => x.id === id))
  }
  function handleCancelSelectActivity() {
    setSelectedActivety(undefined)
  }
  const handleFormOpen = (id?: string) => {
    if (id) {
      handleSelectActivity(id)
    } else {
      handleCancelSelectActivity()
    }

    setEditMode(true)
  }

  function handleFormClose() {
    setEditMode(false)
  }
  function handleCreateOrEditActivity(activity: Activity) {
    activity.id
      ? setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, { ...activity, id: uuid() }])
    setEditMode(false)
    setSelectedActivety(activity)
  }

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter((x) => x.id !== id)])
  }
  useEffect(() => {
    axios
      .get<Activity[]>('http://localhost:5000/api/activities')
      .then((response) => {
        setActivities(response.data)
      })
  }, [])

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          selectedActivety={selectedActivety}
          editMode={editMode}
          formOpen={handleFormOpen}
          formClose={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  )
}

export default App
