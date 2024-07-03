import { v4 as uuidv4 } from 'uuid';

/**
 * Event Service
 * 
 * This module provides services to manage events stored in the local storage.
 * It includes functions to get, add, delete, edit, and search for events.
 * 
 * @module eventsService
 */

/**
 * Retrieve all events from local storage.
 * 
 * @returns {Array<Object>} An array of events.
 */
const getEvents = () => {
  const events = JSON.parse(localStorage.getItem('events')) || [];
  return events.map(event => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end)
  }));
};

/**
 * Add a new event to local storage.
 * 
 * @param {Object} event - The event to be added.
 * @returns {Object} An object containing the new event and any error encountered.
 */
const addEvent = (event) => {
  const events = getEvents();
  const newEvent = { ...event, id: uuidv4() };
  events.push(newEvent);
  localStorage.setItem('events', JSON.stringify(events));
  return { newEvent, error: null };
};

/**
 * Delete an event from local storage.
 * 
 * @param {string} id - The ID of the event to be deleted.
 * @returns {Object} An object containing any error encountered.
 */
const deleteEvent = (id) => {
  const events = getEvents();
  const newEvents = events.filter(e => e.id !== id);
  localStorage.setItem('events', JSON.stringify(newEvents));
  return { error: null };
};

/**
 * Edit an existing event in local storage.
 * 
 * @param {Object} event - The event with updated details.
 * @returns {Object} An object containing any error encountered.
 */
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

/**
 * Search for events in local storage based on search parameters.
 * 
 * @param {Object} searchParams - The search parameters.
 * @returns {Object} An object containing the search results and any error encountered.
 */
const searchEvents = (searchParams) => {
  const events = getEvents();
  const searchResults = events.filter(event => {
    return Object.keys(searchParams).every(key => {
      if (key === 'date') {
        const eventDate = new Date(event[key]).toISOString().split('T')[0]; // Format date to YYYY-MM-DD
        return eventDate.includes(searchParams[key]);
      }
      return event[key].toString().toLowerCase().includes(searchParams[key].toLowerCase());
    });
  });
  return { searchResults, error: null };
};

/**
 * Export the event service functions.
 */
const eventsService = {
  getEvents,
  addEvent,
  deleteEvent,
  editEvent,
  searchEvents
};

export default eventsService;
