import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import RefreshButton from '../../../components/RefreshButton';
import { eventsService, notificationService } from '../../../services/';
import '../styles/EventSearch.css';

/**
 * EventSearch Component
 * 
 * This component provides a search form for filtering events based on various criteria.
 * Users can select a search criterion and input a corresponding search value.
 * The component handles the search submission and displays the results.
 * 
 * @param {Object} props - The props for the component.
 * @param {Function} props.setSearchResults - Function to set the search results.
 * @param {Function} props.refreshList - Function to refresh the list of events.
 * 
 * @returns {JSX.Element} The rendered EventSearch component.
 */
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

  /**
   * Handles changes in the search criteria.
   * 
   * @param {Object} selectedOption - The selected search criterion.
   */
  const handleSearchCriteriaChange = (selectedOption) => {
    setSearchCriteria(selectedOption);
    setSearchValue(''); // Reset search value when criteria changes
  };

  /**
   * Handles changes in the search value input.
   * 
   * @param {Object} e - The change event.
   */
  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  /**
   * Clears the search input and results.
   */
  const handleClearSearch = () => {
    setSearchValue('');
    setSearchResults([]);
    refreshList();
  };

  /**
   * Handles the form submission for searching events.
   * 
   * @param {Object} e - The submit event.
   */
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
