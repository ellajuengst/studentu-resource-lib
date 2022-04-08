import React from 'react'
import { Card } from 'react-bootstrap';
export default function ResourceCard(resource) {
    let title = resource.title; 
    let desc = resource.desc; 

    return (
        <Card>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{desc}</Card.Text>
            </Card.Body>
        </Card>
    )
}
