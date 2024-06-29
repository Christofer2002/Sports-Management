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

const eventsService = {
  getEvents,
  addEvent,
  deleteEvent
};

export default eventsService;
