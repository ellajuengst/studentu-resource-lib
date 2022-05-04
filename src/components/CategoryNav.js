import React from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap'

// component for category navigation bar
export default function CategoryNav(props) {

    let cats = props.categories;
    let selectedCat = props.selectedCategory;

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
                        {(selectedCat == "All") ?
                            <Nav.Item >
                                <Nav.Link active={true} onClick={props.handleClick}>All</Nav.Link>
                            </Nav.Item>
                        :
                            <Nav.Item>
                                <Nav.Link onClick={props.handleClick}>All</Nav.Link>
                            </Nav.Item>
                        }
                        {cats.map((c) => {
                            if (c.name == selectedCat) {
                                return (
                                    <Nav.Item >
                                        <Nav.Link active={true} onClick={props.handleClick}>{c.name}</Nav.Link>
                                    </Nav.Item>
                                )
                            }
                            return (
                                <Nav.Item>
                                    <Nav.Link onClick={props.handleClick}>{c.name}</Nav.Link>
                                </Nav.Item>
                            )
                        })}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>   
    )
}
