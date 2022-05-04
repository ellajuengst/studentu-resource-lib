import React from 'react'
import {Button} from 'react-bootstrap'
import {useNavigate} from "react-router-dom"

export default function AddResource() {
  const navigate = useNavigate();

  return (
    <Button data-testid="add-resource-button" onClick={() =>  navigate("/create-resource")} className="add-resource-btn">Add Resource +</Button>
  )
}
