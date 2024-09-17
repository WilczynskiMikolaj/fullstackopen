import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

const Menu = ({ user, handleLogout }) => {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to='/'>
                                blogs
                            </Nav.Link>
                            <Nav.Link as={Link} to='/users'>
                                users
                            </Nav.Link>
                            <Navbar.Text>
                                {user.name} logged in
                            </Navbar.Text>
                            <Button variant="outline-secondary" data-testid='logout-button' onClick={handleLogout}>Logout</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Menu