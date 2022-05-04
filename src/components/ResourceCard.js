import React from 'react'
import { Card, Button } from 'react-bootstrap';
import {useAuth} from "../AuthContext"
import {useNavigate} from "react-router-dom"

// component for each resource card in resource library
export default function ResourceCard(resource) {
    const {currentUser} = useAuth();
    const navigate = useNavigate();

    let title = resource.title;
    let desc = resource.desc;
    let id = resource.id;

    function navigateToEditResource() {
        // navigate("/edit-resource");
        navigate(
            '/edit-resource',
            {
              state: {
               source: resource
              }
            }
          );
    }

    function navigateToResource() {
        // navigate to resource page
        navigate(
            `/Resource/${id}`,
            {
                state: {
                    source: resource
                }
            }

        )
    }

    return (
        <Card data-testid="resource-card">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{desc}</Card.Text>
                
                <Button data-testid="view-link" variant="link" onClick={navigateToResource} key={id} source={resource}>
                    View 
                </Button>
                {currentUser && (
                        <Button data-testid="edit-link" variant="link" onClick={navigateToEditResource}>Edit</Button>     
                    ) 
                }
            </Card.Body>
        </Card>
    )
}

