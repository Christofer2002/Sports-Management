import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import EventReservationFormModal from '../../EventModals/components/EventReservationFormModal';
import { notificationService, eventsService } from '../../../services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../styles/EventAdd.css';

/**
 * EventAdd Component
 * 
 * This component provides a button to create a new sports event. When the button is clicked,
 * it opens a modal form for adding the event details. The form data is then processed and
 * passed to the onSave handler.
 * 
 * @param {Object} props - The props for the component.
 * @param {Function} props.fetchEvents - Function to refresh the list of events after adding a new one.
 * 
 * @returns {JSX.Element} The rendered EventAdd component.
 */
const EventAdd = ({ fetchEvents }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  /**
   * Opens the modal for creating a new event.
   */
  const handleShowEdit = () => {
    setSelectedEvent(null);
    setShowEditModal(true);
  };

  /**
   * Closes the modal and resets the selected event state.
   */
  const handleCloseEdit = () => {
    setShowEditModal(false);
    setSelectedEvent(null);
  };

  /**
   * Saves the new event and refreshes the event list.
   * 
   * @param {Object} event - The event data to be saved.
   */
  const handleSave = (event) => {
    try {
      if (!event.id) { // Only add if there's no id (new event)
        eventsService.addEvent(event);
      }
      fetchEvents(); // Refresh the list of events
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
