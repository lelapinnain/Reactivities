import { observer } from 'mobx-react-lite'
import React, { Fragment } from 'react'
import { Col, Container } from 'react-bootstrap'

import { useStore } from '../../../app/stores/store'
import ActivityListItem from './ActivityListItem'

export default observer(function ActivityList() {
  const { acitivityStore } = useStore()
  const { groupedActivities } = acitivityStore

  return (
    <>
      {groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <h4 style={{ color: 'teal' }}>{group}</h4>
          <Container>
            <Col>
              {activities.map((activity) => (
                <ActivityListItem key={activity.id} activity={activity} />
              ))}
            </Col>
          </Container>
        </Fragment>
      ))}
    </>
    // <>
    //   <Container>
    //     <Col>
    //       {activitiesByDate.map((activity) => (
    //         <ActivityListItem key={activity.id} activity={activity} />
    //       ))}
    //     </Col>
    //   </Container>
    // </>
  )
})
