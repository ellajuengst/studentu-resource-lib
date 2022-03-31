import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import {ReactComponent as ArrowDown} from '../assets/arrow-down.svg'

export default function TagNav() {
  return (
      <Navbar className="flex-column sidebar" expand="sm">
        <Navbar.Brand className="filters-brand">Filters</Navbar.Brand>
        <Navbar.Toggle aria-controls="filter-sidebar-nav"><div className="arrow-down"><ArrowDown /></div></Navbar.Toggle>
        <Navbar.Collapse id="filter-sidebar-nav">
        <Nav className="bg-light flex-column sidebar"
        activeKey="/home"
        onSelect={selectedKey => alert(`selected ${selectedKey}`)}
        >
            {/* temporary. Will need to replace with actual tags retreived from firebase */}
            <Nav.Item className="sidebar-item">
                <Nav.Link className="sidebar-link" href="/home">Tag</Nav.Link>
            </Nav.Item>
            <Nav.Item className="sidebar-item">
                <Nav.Link className="sidebar-link" eventKey="link-1">Tag</Nav.Link>
            </Nav.Item>
            <Nav.Item className="sidebar-item">
                <Nav.Link className="sidebar-link" eventKey="link-2">Tag</Nav.Link>
            </Nav.Item>
            <Nav.Item className="sidebar-item">
                <Nav.Link className="sidebar-link" eventKey="link-2">Tag</Nav.Link>
            </Nav.Item>
            <Nav.Item className="sidebar-item">
                <Nav.Link className="sidebar-link" eventKey="link-2">Tag</Nav.Link>
            </Nav.Item>
            <Nav.Item className="sidebar-item">
                <Nav.Link className="sidebar-link" eventKey="link-2">Tag</Nav.Link>
            </Nav.Item>
        
        </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}
