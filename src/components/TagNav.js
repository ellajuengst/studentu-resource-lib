import React from 'react'
import { Nav } from 'react-bootstrap'

export default function TagNav() {
  return (
    <Nav className="bg-light sidebar flex-column"
    activeKey="/home"
    onSelect={selectedKey => alert(`selected ${selectedKey}`)}
    >
        <Nav.Item>
            <Nav.Link href="/home">Tag</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="link-1">Tag</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="link-2">Tag</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="link-2">Tag</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="link-2">Tag</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="link-2">Tag</Nav.Link>
        </Nav.Item>
       
    </Nav>
  )
}
