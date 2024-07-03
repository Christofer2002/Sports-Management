import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import RefreshButton from '../../../components/RefreshButton';
import { eventsService, notificationService } from '../../../services/';
import '../styles/EventSearch.css';

const searchOptions = [
  { value: 'name', label: 'Name' },
  { value: 'type', label: 'Type' },
  { value: 'location', label: 'Location' },
  { value: 'capacity', label: 'Capacity' },
  { value: 'description', label: 'Description' },
  { value: 'date', label: 'Date' }
];

const EventSearch = ({ setSearchResults, refreshList }) => {
  const [searchCriteria, setSearchCriteria] = useState(searchOptions[0]);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchCriteriaChange = (selectedOption) => {
    setSearchCriteria(selectedOption);
    setSearchValue(''); // Reset search value when criteria changes
  };

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setSearchResults([]);
    refreshList();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    try {
      const searchParams = {
        [searchCriteria.value]: searchValue
      };
      const { searchResults, error } = eventsService.searchEvents(searchParams);
      if (!error) {
        setSearchResults(searchResults);
        notificationService.success('Search results fetched successfully');
      }
    } catch (error) {
      notificationService.error('Error fetching search results:', error);
    }
  };

  return (
    <Form onSubmit={handleSearchSubmit} className="event-search-form">
      <div className="event-search-row">
        <div className="event-search-col">
          <Form.Label>Search By</Form.Label>
          <Select
            value={searchCriteria}
            onChange={handleSearchCriteriaChange}
            options={searchOptions}
            classNamePrefix="react-select"
            isSearchable={false}
          />
        </div>
        <div className="event-search-col input-flex">
          <Form.Label>Search</Form.Label>
          <div className="input-with-clear">
            <Form.Control
              type={searchCriteria.value === 'date' ? 'date' : 'text'}
              value={searchValue}
              onChange={handleSearchValueChange}
              placeholder={`Enter ${searchCriteria.label}`}
            />
            {searchValue && (
              <FontAwesomeIcon
                icon={faTimes}
                className="clear-icon"
                onClick={handleClearSearch}
              />
            )}
          </div>
        </div>
        <div className="event-search-col event-search-buttons">
          <Button type="submit" className="ml-2 btn-search">
            Search
          </Button>
          <RefreshButton refreshList={refreshList} />
        </div>
      </div>
    </Form>
  );
};

export default EventSearch;
