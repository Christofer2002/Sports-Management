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
  console.log('events:', events);
  const newEvent = { ...event, id: uuidv4() };
  console.log('event:', newEvent);
  events.push(newEvent);
  localStorage.setItem('events', JSON.stringify(events));
  return { newEvent, error: null };
};

const deleteEvent = (id) => {
  const events = getEvents();
  const newEvents = events.filter(e => e.id !== id);
  localStorage.setItem('events', JSON.stringify(newEvents));
  return { error: null };
};

const editEvent = (event) => {
  const events = getEvents();
  const updatedEvents = events.map(e => {
    if (e.id === event.id) {
      return { ...event, start: new Date(event.date), end: new Date(event.date) };
    }
    return e;
  });
  updatedEvents.forEach(e => e.end.setHours(e.end.getHours() + 2)); // Assuming events last for 2 hours
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
