import React from 'react'
import { Form, Button, FormControl } from 'react-bootstrap'

export default function SearchBar() {
  return (
    <Form className="search-bar d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-secondary">Search</Button>
      </Form>
  )
}
