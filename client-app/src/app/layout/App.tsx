import React, { useState, useEffect, Fragment } from 'react'

import { v4 as uuid } from 'uuid'
import { Container } from 'react-bootstrap'

import NavBar from './NavBar'
import { Activity } from '../models/activity'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import agent from '../API/agent'
import LoadingComponent from './LoadingComponent'

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivety, setSelectedActivety] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

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
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter((x) => x.id !== activity.id), activity])
      })
      setSelectedActivety(activity)
      setEditMode(false)
      setSubmitting(false)
    } else {
      activity.id = uuid()
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity])
        setSelectedActivety(activity)
        setEditMode(false)
        setSubmitting(false)
      })
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true)
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((x) => x.id !== id)])
      setSubmitting(false)
      setSelectedActivety(undefined)
    })
  }

  useEffect(() => {
    agent.Activities.list().then((response) => {
      let activities: Activity[] = []
      response.forEach((activity) => {
        activity.date = activity.date.split('T')[0]
        activities.push(activity)
      })

      setActivities(activities)
      setLoading(false)
    })
  }, [])
  if (loading) return <LoadingComponent />

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
          submitting={submitting}
        />
      </Container>
    </>
  )
}

export default App
