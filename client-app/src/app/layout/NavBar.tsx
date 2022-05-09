import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    // <>
    //   <Nav >
    //     <Nav.Item>
    //       <img src="/assets/logo.png" alt="sdf" />
    //     </Nav.Item>
    //     <Nav.Item>Activities</Nav.Item>
    //     <Nav.Item>
    //       <Button variant="outline-primary">Add</Button>
    //     </Nav.Item>
    //   </Nav>

    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            {' '}
            <img
              src="/assets/logo.png"
              alt="logo"
              width={'30px'}
              height="30px"
              style={{ marginRight: '10px', paddingLeft: '0px' }}
            />
          </Navbar.Brand>
          <Navbar.Toggle />

          <Navbar.Text as={NavLink} to="/activities">
            Activities
          </Navbar.Text>
          <Navbar.Collapse />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">Mark Otto</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
