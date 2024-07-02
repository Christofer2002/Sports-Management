import React, { useState, useEffect } from 'react';
import { ReactNotifications } from 'react-notifications-component';
import { Container, Row, Col, Button, ButtonGroup, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import { EventSearch, EventAdd } from '../../EventTools/components/';
import { EventDetailModal, EventReservationFormModal } from '../../EventModals/components/';
import EventItem from './EventItem';
import CustomDateCell from './CustomDateCell';
import eventsService from '../../../services/eventsService';
import notificationService from '../../../services/notificationService';
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
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [view, setView] = useState(Views.MONTH);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const storedEvents = await eventsService.getEvents();
      setEvents(storedEvents);
      setSearchResults([]);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
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

  const handleSave = (event) => {
    if (selectedEvent) {
      // Editing an existing event
      const updatedEvents = events.map(e => (e.id === event.id ? event : e));
      setEvents(updatedEvents);
      notificationService.success("Event updated successfully!");
    } else {
      // Adding a new event
      setEvents([...events, event]);
      notificationService.success("Event added successfully!");
    }
  };

  const handleDeleteEvent = (eventId) => {
    eventsService.deleteEvent({ id: eventId });
    const updatedEvents = events.filter(e => e.id !== eventId);
    setEvents(updatedEvents);
    notificationService.error("Event deleted successfully!");
  };

  const handleDeleteSelectedEvents = () => {
    selectedEvents.forEach(eventId => {
      handleDeleteEvent(eventId);
    });
    setSelectedEvents([]);
  };

  const handleSelectEvent = (eventId) => {
    if (selectedEvents.includes(eventId)) {
      setSelectedEvents(selectedEvents.filter(id => id !== eventId));
    } else {
      setSelectedEvents([...selectedEvents, eventId]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedEvents(events.map(event => event.id));
    } else {
      setSelectedEvents([]);
    }
  };

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
    setShowDetailModal(true);
  };

  const renderToolbar = (toolbar) => (
    <div className="toolbar">
      <ButtonGroup>
        <Button className="btn" onClick={() => toolbar.onNavigate('TODAY')}>Today</Button>
        <Button className="btn" onClick={() => toolbar.onNavigate('PREV')}>Back</Button>
        <Button className="btn" onClick={() => toolbar.onNavigate('NEXT')}>Next</Button>
      </ButtonGroup>
      <span className="rbc-toolbar-label">{toolbar.label}</span>
      <ButtonGroup>
        <Button className="btn" onClick={() => toolbar.onView(Views.MONTH)}>Month</Button>
        <Button className="btn" onClick={() => toolbar.onView(Views.WEEK)}>Week</Button>
        <Button className="btn" onClick={() => toolbar.onView(Views.DAY)}>Day</Button>
        <Button className="btn" onClick={() => toolbar.onView(Views.AGENDA)}>Agenda</Button>
      </ButtonGroup>
    </div>
  );

  return (
    <Container fluid className="mt-4 calendar-container">
      <ReactNotifications />
      <Row className="mb-3 align-items-center">
        <Col xs="auto">
          <EventAdd handleShowEdit={handleShowEdit} />
        </Col>
        <Col>
          <EventSearch setSearchResults={setSearchResults} refreshList={fetchEvents} />
        </Col>
      </Row>
      <div className='calendar-box'>
        <Row>
          <Col>
            <Calendar
              localizer={localizer}
              events={searchResults.length ? searchResults : events}
              startAccessor="start"
              endAccessor="end"
              titleAccessor="name"
              selectable
              style={{ height: 600 }}
              view={view}
              onView={(view) => setView(view)}
              components={{
                event: (props) => (
                  <EventItem
                    event={props.event}
                    onView={handleViewEvent}
                    onEdit={(event) => {
                      setSelectedEvent(event);
                      setShowEditModal(true);
                    }}
                    onDelete={handleDeleteEvent}
                    onSelect={handleSelectEvent}
                    view={view}
                  />
                ),
                toolbar: renderToolbar,
                dateCellWrapper: CustomDateCell, // Aquí se utiliza el nuevo componente
              }}
              className="calendar"
            />
          </Col>
        </Row>
      </div>
      <EventReservationFormModal
        show={showEditModal}
        handleClose={handleCloseEdit}
        onSave={handleSave}
        initialData={selectedEvent}
      />
      <EventDetailModal
        show={showDetailModal}
        handleClose={handleCloseDetail}
        event={selectedEvent}
        handleEdit={() => {
          setShowDetailModal(false);
          setShowEditModal(true);
        }}
        handleDelete={() => handleDeleteEvent(selectedEvent.id)}
        view={view}
      />
    </Container>
  );
};

export default CalendarComponent;
