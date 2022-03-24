import React, { useState, useEffect, Fragment } from "react";
import GetFirebase from '../GetFirebase'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useAuth} from "../AuthContext"
import {useNavigate} from "react-router-dom"
import SignOut from "../SignOut"
import {getResources} from "../firebase"
import firebase from "../firebase";
import ResourceCard from "../components/ResourceCard";
import { Container, Nav, NavItem, Row, Navbar, NavDropdown, Button, Col, Stack, Form } from 'react-bootstrap';
import CategoryNav from "../components/CategoryNav";
import TagNav from "../components/TagNav";

export default function ResourceLibrary() {
  const {currentUser} = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resources, setResources] = useState([]);
  const ref = firebase.firestore().collection("resources");

  function navigateToSignIn() {
    navigate("/login");
  }

  function getResources() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setResources(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getResources();
  }, []);
  
  return ( 
    <Container fluid={true}>
        <Stack direction="horizontal" gap={3}>
            <h1 className="me-auto">Resource Library</h1>
            {currentUser ? (
            <>
            <p>Admin Mode</p>
            <SignOut />
            </>
            ) : 
                <Button onClick={navigateToSignIn}>
                Admin Login
                </Button>
            }
        </Stack>
       
        <CategoryNav />
        <Container fluid={true}>
            <Row>
                <Col sm={2}>
                    <TagNav />
                </Col>
                <Col>
                    <Container>
                        {loading ? <h1>Loading...</h1> : null}
                        <Row>
                        {resources.map((resource) => (
                            <Col>
                            <ResourceCard {...resource} key={resource.title} />
                            </Col>
                        ))}
                        </Row>
                    </Container>
                    
                </Col>
            </Row>
        </Container>
    </Container>   
      
    
  )
}
