import React from 'react';
import { Button } from 'react-bootstrap';

const EventAdd = ({ handleShowEdit }) => {

  const handleShow = () => {
    handleShowEdit();
  }

  return (
    <Button variant="primary" onClick={handleShow} className="create-event-btn">
      New Sports Event
    </Button>
  );
}

export default EventAdd;
