import React from 'react'
import './Card.css'
import { LinkContainer } from 'react-router-bootstrap'

import { Card } from 'react-bootstrap'
const CardContainer = ({ id, name, data }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{data.substr(0, 80) + '...'}</Card.Text>
        <LinkContainer to={`/model/${id}`}>
          <Card.Link>Click here for more details</Card.Link>
        </LinkContainer>
      </Card.Body>
    </Card>
  )
}

export default CardContainer
