import useFetch from '../features/Calendar/hooks/useFetch';

const API_URL = '/events';

const fetchEvents = () => {
  const { data, error, loading, setData } = useFetch(API_URL);
  return { events: data, error, loading, setEvents: setData };
};

const addEvent = (event) => {
  const { data, error, loading } = useFetch(`${API_URL}/add`, 'POST', event);
  return { newEvent: data, error, loading };
};

const searchEvents = (criteria) => {
  const { data, error, loading } = useFetch(`${API_URL}/search`, 'GET', criteria);
  return { searchResults: data, error, loading };
};

const eventsService = {
  fetchEvents,
  addEvent,
  searchEvents,
};

export default eventsService;
