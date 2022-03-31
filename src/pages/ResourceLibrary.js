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
import SearchBar from "../components/SearchBar"

export default function ResourceLibrary() {
  const {currentUser} = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resources, setResources] = useState([]);
  const ref = firebase.firestore().collection("resources");
  const [selectedFilters, setSelectedFilters] = useState([]);

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
        <Stack className="resource-library-header" direction="horizontal" gap={3}>
            <h1 className="resource-library-title me-auto">Resource Library</h1>
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
                <Col className="tag-nav-container" sm={2}>
                    <TagNav />
                </Col>
                <Col>
                    <div className="search-bar-container">
                      <SearchBar />
                    </div>
                    <Container className="resources-container">
                        {loading ? <p>Loading...</p> : null}
                        <Row>
                        {resources.map((resource) => (
                            <Col lg={3} md={6} sm={12}>
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
