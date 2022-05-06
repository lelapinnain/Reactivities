import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Navbar, Container } from 'react-bootstrap'

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
          <Navbar.Brand href="#home">
            {' '}
            <img
              src="/assets/logo.png"
              alt="logo"
              width={'30px'}
              height="30px"
              style={{ marginRight: '10px', paddingLeft: '0px' }}
            />
            Activities
          </Navbar.Brand>
          <Navbar.Toggle />
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
