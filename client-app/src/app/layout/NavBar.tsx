import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Container, NavDropdown, Button } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { useStore } from '../stores/store'
import { history } from '../..'
import { observer } from 'mobx-react-lite'

export default observer(function NavBar() {
  const {
    userStore: { logout, user },
  } = useStore()
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
          <Navbar.Text as={NavLink} to="/errors">
            Errors
          </Navbar.Text>
          <Navbar.Collapse />

          {user && (
            <>
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>Signed in as: {user?.username}</Navbar.Text>
              </Navbar.Collapse>
              <NavDropdown title={`${user?.username}`} id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to={`/profiles/${user.username}`}>
                  Profile
                </NavDropdown.Item>
                {/*<NavDropdown.Item href="#action4">Another action</NavDropdown.Item> */}
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Button onClick={logout}>logout</Button>
                </NavDropdown.Item>
              </NavDropdown>
            </>
          )}
          {!user && (
            <Button
              onClick={() => {
                history.push('/login')
              }}
            >
              Login
            </Button>
          )}
        </Container>
      </Navbar>
    </>
  )
})
