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
  events.push(event);
  localStorage.setItem('events', JSON.stringify(events));
  return { newEvent: event, error: null };
};

const eventsService = {
  getEvents,
  addEvent,
};

export default eventsService;
