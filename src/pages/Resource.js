import { useParams } from 'react-router-dom'
import { FetchPage } from '../hooks/FetchPage'
import 'react-bootstrap-typeahead/css/Typeahead.css';
import React, { useState, useEffect, Fragment } from "react";
import {useAuth} from "../AuthContext"
import {useNavigate} from "react-router-dom"
import SignOut from "../SignOut"
import firebase from "../firebase";
import { Container, Nav, NavItem, Row, Navbar, NavDropdown, Button, Col, Stack, Form, FormControl } from 'react-bootstrap';
import AddResource from "../components/AddResourceButton"

import { Card } from 'react-bootstrap';

export default function Resource(resource) {
    const {currentUser} = useAuth();
    const navigate = useNavigate();

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


    const [loading, setLoading] = useState(false);
    const [resources, setResources] = useState([]);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
  
    const ref = firebase.firestore();
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
  
    const [selectedResources, setSelectedResources] = useState([]);

    

    /*Code for fetching sorces*/
    const { id } = useParams()
    const { error, rpage } = FetchPage('resources', id)

    if (error) {
        return <div> {error} </div>
    }

    if(!rpage) {
        return <div> Loading </div>
    }

    function navigateToSignIn() {
        navigate("/login");
      }

    return(

    <Container>
        <Container fluid={true}>
        <Stack className="resource-library-header" direction="horizontal" gap={3}>
            <h1 className="resource-library-title me-auto">Resource Library</h1>
            {currentUser ? (
            <>
        <Button variant="outline-secondary" disabled>Admin Mode</Button>
        <div className="header-btn-holder">
        <AddResource />
            <SignOut />
        </div>
            
            </>
            ) : 
                <Button onClick={navigateToSignIn}>
                Admin Login
                </Button>
            }
        </Stack>
    </Container>


    <Card>
        <Card.Body>
        {currentUser && (
                            <Button variant="link" onClick={navigateToEditResource}>Edit</Button>     
                        ) 
                    }
            <Card.Title>{rpage.title}</Card.Title>
            <Card.Text>{rpage.desc} </Card.Text>
            <Card.Text><a href={rpage.reference}> Open </a> </Card.Text>
        </Card.Body>
    </Card>

    </Container>
/*
<div className="resource-page">
            
<h1>{rpage.title}</h1>
<p>{rpage.desc}</p>
<a href={rpage.reference}> View file </a>
</div>
*/

    )
}