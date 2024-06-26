import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const EventDetailModal = ({ show, handleClose, event, handleEdit }) => {
  if (!event) return null;
  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Event Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Name:</strong> {event.name}</p>
        <p><strong>Type:</strong> {event.type}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Capacity:</strong> {event.capacity}</p>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Date:</strong> {event.date}</p>
        {event.photos && event.photos.length > 0 && (
          <div>
            <strong>Photos:</strong>
            <ul>
              {Array.from(event.photos).map((photo, index) => (
                <li key={index}>{photo.name}</li>
              ))}
            </ul>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleEdit}>Edit</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventDetailModal;
