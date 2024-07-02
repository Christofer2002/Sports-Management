import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import RefreshButton from '../../../components/RefreshButton';
import eventsService from '../../../services/eventsService';
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
  };

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setSearchResults([]);
    refreshList();
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const searchParams = {
        [searchCriteria.value]: searchValue
      };
      const { searchResults, error } = await eventsService.searchEvents(searchParams);
      if (!error) {
        setSearchResults(searchResults);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <Form onSubmit={handleSearchSubmit} className="event-search-form">
      <Row className="align-items-center">
        <Col xs="auto">
          <Form.Label>Search By</Form.Label>
          <Select
            value={searchCriteria}
            onChange={handleSearchCriteriaChange}
            options={searchOptions}
            classNamePrefix="react-select"
          />
        </Col>
        <Col>
          <Form.Label>Search</Form.Label>
          <div className="input-with-clear">
            <Form.Control
              type="text"
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
        </Col>
        <Col xs="auto" className='d-flex gap-3'>
          <Button variant="primary" type="submit" className="ml-2">
            Search
          </Button>
          <RefreshButton refreshList={refreshList} />
        </Col>
      </Row>
    </Form>
  );
};

export default EventSearch;
