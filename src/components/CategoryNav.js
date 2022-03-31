import React from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap'

export default function CategoryNav() {


  return (
      <Navbar className="category-nav" bg="light" expand="lg" p={0}>
        <Container fluid={true}>
        <Navbar.Brand className="categories-brand" href="#home">Categories</Navbar.Brand>
        <Navbar.Toggle className="categories-toggler" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav
                activeKey="/all"
                onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
                className="justify-content-center"
                fluid={true}
                fill={true}
                > 
                <Nav.Item>
                    <Nav.Link href="/all">All</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Academic Resources</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Community Resources</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Durham Public Schools</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Health</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Latinx Resources</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Online Platforms</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Social/Emotional Support</Nav.Link>
                </Nav.Item>
            </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    
  )
}
