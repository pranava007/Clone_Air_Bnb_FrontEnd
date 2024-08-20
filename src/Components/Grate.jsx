import React from 'react'
import { Card, Badge } from 'react-bootstrap';


const Grate = () => {
    const rating = 5.0;
    const reviews = 7;
    const isGuestFavourite = true;
 
  return (



<Card className="mb-3">
<Card.Body>
  <Card.Title>Property Details</Card.Title>
  <Card.Text>
    <div className="d-flex align-items-center">
      <h5 className="mb-0 me-2">{rating}</h5>
      <Badge bg="success">{reviews} reviews</Badge>
    </div>
    {isGuestFavourite && (
      <div className="mt-2">
        <Badge bg="warning" text="dark">Guest Favourite</Badge>
        <p className="mt-2">
          This home is in the top 5% of eligible listings based on ratings, reviews, and reliability.
        </p>
      </div>
    )}
  </Card.Text>
</Card.Body>
</Card>
   
  )
}

export default Grate