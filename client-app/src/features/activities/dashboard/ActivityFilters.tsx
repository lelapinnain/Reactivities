import React from 'react'
import { Accordion, Nav } from 'react-bootstrap'
import Calendar from 'react-calendar'

export default function ActivityFilters() {
  return (
    <>
      <Accordion defaultActiveKey="0" flush style={{ marginTop: '40px', marginBottom: '10px' }}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Activity Filters</Accordion.Header>
          <Accordion.Body>
            <Nav className="flex-column" style={{ width: '100%' }}>
              <Nav.Item>Going</Nav.Item>
              <Nav.Item>Not Going</Nav.Item>
              <Nav.Item>Intersted</Nav.Item>
              <Nav.Item>Disabled</Nav.Item>
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Calendar />
    </>
  )
}
