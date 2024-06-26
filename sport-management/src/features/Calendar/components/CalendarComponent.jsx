import React, { useState, useEffect } from 'react';
import { ReactNotifications, Store } from 'react-notifications-component';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import EventSearch from '../../EventSearch/components/EventSearch';
import ReservationFormModal from '../../Reservation/components/ReservationFormModal';
import EventDetailModal from '../../Reservation/components/EventDetailModal';
import eventsService from '../../../services/eventsService';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/CalendarComponent.css';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';


const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const storedEvents = eventsService.getEvents();
    setEvents(storedEvents);
  }, []);

  const handleSelectSlot = ({ start }) => {
    setSelectedEvent({ date: moment(start).format('YYYY-MM-DD') });
    setShowEditModal(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowDetailModal(true);
  };

  const handleShowEdit = () => {
    setSelectedEvent(null);
    setShowEditModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedEvent(null);
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
    setSelectedEvent(null);
  };

  const handleSave = (newEvent) => {
    setEvents([...events, newEvent]);
    Store.addNotification({
      title: "Success!",
      message: "Event added successfully!",
      type: "success",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true
      }
    });
  };

  return (
    <Container fluid className="mt-4 calendar-container">
      <ReactNotifications />
      <Row className="mb-3 align-items-center">
        <Col xs="auto">
          <Button variant="primary" onClick={handleShowEdit} className="create-event-btn">
            Create New Sports Event
          </Button>
        </Col>
        <Col>
          <EventSearch setSearchResults={setSearchResults} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Calendar
            localizer={localizer}
            events={searchResults.length ? searchResults : events}
            startAccessor="start"
            endAccessor="end"
            titleAccessor="name"
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            style={{ height: 600 }}
            className="calendar"
          />
        </Col>
      </Row>
      {selectedEvent && (
        <EventDetailModal
          show={showDetailModal}
          handleClose={handleCloseDetail}
          event={selectedEvent}
          handleEdit={() => {
            setShowDetailModal(false);
            setShowEditModal(true);
          }}
        />
      )}
      <ReservationFormModal
        show={showEditModal}
        handleClose={handleCloseEdit}
        onSave={handleSave}
        initialData={selectedEvent}
      />
    </Container>
  );
};

export default CalendarComponent;