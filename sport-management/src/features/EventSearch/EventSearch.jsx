import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import eventsService from '../../services/eventsService';
import { ToastContainer, toast } from 'react-toastify';

const searchOptions = [
  { value: 'name', label: 'Name' },
  { value: 'day', label: 'Day' },
  { value: 'month', label: 'Month' },
  { value: 'year', label: 'Year' }
];

const EventSearch = ({ setSearchResults }) => {
  const [searchCriteria, setSearchCriteria] = useState(searchOptions[0]);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchCriteriaChange = (selectedOption) => {
    setSearchCriteria(selectedOption);
  };

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const searchParams = {
        [searchCriteria.value]: searchValue
      };
      const { searchResults, error } = eventsService.searchEvents(searchParams);
      if (!error) {
        setSearchResults(searchResults);
        toast.success('Search successful!');
      }
    } catch (error) {
      toast.error('Failed to search events.');
    }
  };

  return (
    <>
      <ToastContainer />
      <Form onSubmit={handleSearchSubmit} className="event-search-form">
        <Row className="align-items-end">
          <Col xs="auto">
            <Form.Label>Search By</Form.Label>
            <Select
              value={searchCriteria}
              onChange={handleSearchCriteriaChange}
              options={searchOptions}
            />
          </Col>
          <Col>
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              value={searchValue}
              onChange={handleSearchValueChange}
              placeholder={`Enter ${searchCriteria.label}`}
            />
          </Col>
          <Col xs="auto">
            <Button variant="primary" type="submit" className="mt-4">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default EventSearch;
