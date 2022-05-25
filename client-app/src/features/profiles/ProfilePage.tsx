import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import LoadingComponent from '../../app/layout/LoadingComponent'
import { useStore } from '../../app/stores/store'
import ProfileHeader from './ProfileHeader'
import TabContent from './TabContent'

export default observer(function ProfilePage() {
  const { username } = useParams()
  const { profileStore } = useStore()
  const { loadingProfile, loadProfile, profile } = profileStore

  useEffect(() => {
    loadProfile(username!)
  }, [loadProfile, username])
  if (loadingProfile) return <LoadingComponent />
  return (
    <>
      <Container>
        {profile && (
          <>
            <ProfileHeader profile={profile!} />

            <TabContent profile={profile!} />
          </>
        )}
      </Container>
    </>
  )
})
