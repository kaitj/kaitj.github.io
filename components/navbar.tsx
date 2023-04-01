import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import navData from '../data/navigation'

export const NavBar = () =>  {
    return (
        <Navbar expand="lg" variant="dark">
            <Container fluid>
                {/* Logo */}
                <Navbar.Brand className="navbar-brand" href="/">Jason Kai</Navbar.Brand>
                {/* Hamburger */}
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav"  className='justify-content-end'>
                    {/* Nav Menu */}
                    <Nav>
                        {navData.map((nav) => 
                            <Nav.Link href={nav.url} key={nav.name}>
                                {nav.name}
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}