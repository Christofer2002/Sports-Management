import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import EventReservationFormModal from '../../EventModals/components/EventReservationFormModal';
import { notificationService, eventsService } from '../../../services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../styles/EventAdd.css';

const EventAdd = ({ fetchEvents }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleShowEdit = () => {
    setSelectedEvent(null);
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
    setSelectedEvent(null);
  };

  const handleSave = (event) => {
    try {
      if (!event.id) { // Solo agregar si no hay un id (nuevo evento)
        eventsService.addEvent(event);
      }
      fetchEvents(); // Actualiza la lista de eventos
      notificationService.success("Event added successfully!");
      setShowEditModal(false);
    } catch (error) {
      console.error('Error adding event:', error);
      notificationService.error("Failed to add event.");
    }
  };

  return (
    <>
      <div className='event-add'>
        <Form.Label>Create Event</Form.Label>
        <Button variant="primary" onClick={handleShowEdit} className="create-event-btn">
          <span className="btn-text">New Sports Event</span>
          <FontAwesomeIcon icon={faPlus} className="btn-icon" />
        </Button>
      </div>
      <EventReservationFormModal
        show={showEditModal}
        handleClose={handleCloseEdit}
        onSave={handleSave}
        initialData={selectedEvent}
      />
    </>
  );
};

export default EventAdd;
