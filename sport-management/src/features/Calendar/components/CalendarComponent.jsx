import React, { useState, useEffect } from 'react';
import { ReactNotifications } from 'react-notifications-component';
import { Container, Button, ButtonGroup } from 'react-bootstrap';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import { EventSearch, EventAdd } from '../../EventTools/components/';
import { EventDetailModal, EventReservationFormModal } from '../../EventModals/components/';
import { EventItem, CustomDateCell } from './';
import { eventsService, notificationService } from '../../../services/';
import moment from 'moment';
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

  const fetchEvents = () => {
    try {
      const storedEvents = eventsService.getEvents();
      setEvents(storedEvents);
      setSearchResults([]);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedEvent(null);
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
    setSelectedEvent(null);
  };

  const handleEditEvent = (event) => {
    try {
      eventsService.editEvent(event);
      fetchEvents(); // Actualiza la lista de eventos
      notificationService.success("Event updated successfully!");
    } catch (error) {
      console.error('Error updating event:', error);
      notificationService.error("Failed to update event.");
    }
  };

  const handleDeleteEvent = (eventId) => {
    try {
      eventsService.deleteEvent(eventId);
      fetchEvents(); // Actualiza la lista de eventos
      notificationService.success("Event deleted successfully!");
      setShowDetailModal(false);
    } catch (error) {
      console.error('Error deleting event:', error);
      notificationService.error("Failed to delete event.");
    }
  };

  const handleSelectEvent = (eventId) => {
    if (selectedEvents.includes(eventId)) {
      setSelectedEvents(selectedEvents.filter(id => id !== eventId));
    } else {
      setSelectedEvents([...selectedEvents, eventId]);
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
        <Button
          className={`btn ${toolbar.view === Views.MONTH ? 'active-view' : ''}`}
          onClick={() => toolbar.onView(Views.MONTH)}
        >
          Month
        </Button>
        <Button
          className={`btn ${toolbar.view === Views.WEEK ? 'active-view' : ''}`}
          onClick={() => toolbar.onView(Views.WEEK)}
        >
          Week
        </Button>
        <Button
          className={`btn ${toolbar.view === Views.DAY ? 'active-view' : ''}`}
          onClick={() => toolbar.onView(Views.DAY)}
        >
          Day
        </Button>
        <Button
          className={`btn ${toolbar.view === Views.AGENDA ? 'active-view' : ''}`}
          onClick={() => toolbar.onView(Views.AGENDA)}
        >
          Agenda
        </Button>
      </ButtonGroup>
    </div>
  );


  return (
    <Container fluid className="mt-4 calendar-container">
      <ReactNotifications />
      <div className="event-search-container">
        <EventAdd fetchEvents={fetchEvents} />
        <EventSearch setSearchResults={setSearchResults} refreshList={fetchEvents} />
      </div>
      <div className='calendar-box'>
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
            dateCellWrapper: CustomDateCell,
          }}
          className="calendar"
        />
      </div>
      <EventReservationFormModal
        show={showEditModal}
        handleClose={handleCloseEdit}
        onSave={handleEditEvent}
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
