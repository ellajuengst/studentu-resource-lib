import React from 'react'
import { Card } from 'react-bootstrap';
export default function ResourceCard(resource) {
    console.log(resource)
    let title = resource.title; 
    let desc = resource.desc; 
    console.log(title)

    return (
        <Card>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{desc}</Card.Text>
            </Card.Body>
        </Card>
    )
}
