import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import moment from 'moment';

/**
 * EventDetailModal
 * 
 * This component displays the details of an event in a modal. It provides options to edit
 * or delete the event if it is not a past event.
 * 
 * @param {Object} props - The props for the component.
 * @param {boolean} props.show - Whether the modal is visible.
 * @param {Function} props.handleClose - Function to handle closing the modal.
 * @param {Object} props.event - The event object containing event details.
 * @param {Function} props.handleEdit - Function to handle editing the event.
 * @param {Function} props.handleDelete - Function to handle deleting the event.
 * @param {String} props.view - The current calendar view.
 * 
 * @returns {JSX.Element | null} The rendered event detail modal component.
 */
const EventDetailModal = ({ show, handleClose, event, handleEdit, handleDelete, view }) => {
  if (!event) return null;

  const isPastEvent = moment(event.end).isBefore(moment());

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
        <p><strong>Date:</strong> {moment(event.start).format('LLL')} - {moment(event.end).format('LLL')}</p>
        {event.photos && event.photos.length > 0 && (
          <div>
            <strong>Photos:</strong>
            <ul>
              {event.photos.map((photo, index) => (
                <li key={index}><img src={photo} alt={`Event ${index}`} style={{ maxWidth: '100%' }} /></li>
              ))}
            </ul>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleEdit} disabled={isPastEvent} hidden={isPastEvent}>Edit</Button>
        <Button variant="danger" onClick={handleDelete} disabled={isPastEvent} hidden={isPastEvent}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventDetailModal;
