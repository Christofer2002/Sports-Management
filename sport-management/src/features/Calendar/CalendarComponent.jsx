import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import ReservationFormModal from '../Reservation/ReservationFormModal';
import EventSearch from '../EventSearch/EventSearch';
import eventsService from '../../services/eventsService';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style/CalendarComponent.css';

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const { events, setEvents } = eventsService.fetchEvents();
  const [searchResults, setSearchResults] = useState([]);

  const handleSelectSlot = async ({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title) {
      const newEvent = { start, end, title };
      const { newEvent: addedEvent, error } = eventsService.addEvent(newEvent);
      if (!error) {
        setEvents([...events, addedEvent]);
      }
    }
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <Container fluid className="mt-4 calendar-container">
      <Row className="mb-3 align-items-center">
        <Col xs="auto" className="d-flex align-items-center">
          <Button variant="primary" onClick={handleShow} className="create-event-btn">
            Create New Sports Event
          </Button>
        </Col>
        <Col className="d-flex align-items-center">
          <EventSearch setSearchResults={setSearchResults} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Calendar
            localizer={localizer}
            events={searchResults.length ? searchResults : events || []}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelectSlot}
            style={{ height: 600 }}
            className="calendar"
          />
        </Col>
      </Row>
      <ReservationFormModal show={showModal} handleClose={handleClose} />
    </Container>
  );
};

export default CalendarComponent;
