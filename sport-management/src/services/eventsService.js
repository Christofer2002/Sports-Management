import { v4 as uuidv4 } from 'uuid';

const getEvents = () => {
  const events = JSON.parse(localStorage.getItem('events')) || [];
  return events.map(event => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end)
  }));
};

const addEvent = (event) => {
  const events = getEvents();
  const newEvent = { ...event, id: uuidv4() };
  events.push(newEvent);
  localStorage.setItem('events', JSON.stringify(events));
  return { newEvent, error: null };
};

const deleteEvent = (event) => {
  const events = getEvents();
  const newEvents = events.filter(e => e.id !== event.id);
  localStorage.setItem('events', JSON.stringify(newEvents));
  return { error: null };
};

const editEvent = (event) => {
  const events = getEvents();
  const updatedEvents = events.map(e => {
    if (e.id === event.id) {
      return event;
    }
    return e;
  });
  localStorage.setItem('events', JSON.stringify(updatedEvents));
  return { error: null };
};

const searchEvents = (searchParams) => {
  const events = getEvents();
  const searchResults = events.filter(event => {
    return Object.keys(searchParams).every(key => {
      return event[key].toString().toLowerCase().includes(searchParams[key].toLowerCase());
    });
  });
  return { searchResults, error: null };
};

const eventsService = {
  getEvents,
  addEvent,
  deleteEvent,
  editEvent,
  searchEvents
};

export default eventsService;
