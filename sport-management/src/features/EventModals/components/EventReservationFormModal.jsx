import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import eventsService from '../../../services/eventsService';
import eventTypes from '../../../data/eventTypes';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '../styles/EventReservationFormModal.css';

const EventReservationFormModal = ({ show, handleClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    capacity: '',
    description: '',
    date: '',
    photos: []
  });

  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        type: initialData.type || '',
        location: initialData.location || '',
        capacity: initialData.capacity || '',
        description: initialData.description || '',
        date: initialData.date || '',
        photos: initialData.photos || []
      });
      setSelectedLocation(initialData.location || '');
    } else {
      resetForm();
    }
  }, [initialData]);

  const resetForm = () => {
    setFormData({
      name: '',
      type: '',
      location: '',
      capacity: '',
      description: '',
      date: '',
      photos: []
    });
    setSelectedLocation('');
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photos') {
      const fileArray = Array.from(files);
      const fileReaders = fileArray.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });
      Promise.all(fileReaders).then((fileDataUrls) => {
        setFormData({ ...formData, [name]: fileDataUrls });
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  console.log(formData);

  const handleSelectChange = (selectedOption, name) => {
    setFormData({ ...formData, [name]: selectedOption.value });
  };

  const handleSelectAddress = (value) => {
    console.log(value);
    if (value) {
      const formattedLocation = value.properties.formatted;
      setSelectedLocation(formattedLocation);
      setFormData({ ...formData, location: formattedLocation });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.location) {
      alert('Please select a location.');
      return;
    }

    try {
      const eventStartDate = new Date(formData.date);
      const eventEndDate = new Date(formData.date);
      eventEndDate.setHours(eventEndDate.getHours() + 2); // Assuming events last for 2 hours

      const newEvent = {
        ...formData,
        start: eventStartDate,
        end: eventEndDate
      };

      const { newEvent: savedEvent, error } = await eventsService.addEvent(newEvent);
      if (!error) {
        onSave(savedEvent);
        handleClose();
        resetForm();
      }
    } catch (error) {
      // handle error
    }
  };

  const suggestionsFilter = (suggestions) => {
    console.log(suggestions);
    return suggestions.map(suggestion => {
      suggestion.properties.name = suggestion.properties.formatted || suggestion.properties.address_line1 || suggestion.properties.address_line2 || 'Unnamed place';
      return suggestion;
    });
  };

  console.log(selectedLocation);

  return (
    <Modal show={show} onHide={() => { handleClose(); resetForm(); }} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? 'Edit Event' : 'Create New Sports Event'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formType">
            <Form.Label>Type</Form.Label>
            <Select
              value={eventTypes.find(option => option.value === formData.type)}
              onChange={(option) => handleSelectChange(option, 'type')}
              options={eventTypes}
              placeholder="Select event type"
              required
            />
          </Form.Group>

          <Form.Group controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <GeoapifyContext apiKey="8cc6fb5377d343ca8f5bdc678be49034">
              <GeoapifyGeocoderAutocomplete
                placeholder="Enter address here"
                filterByCountryCode={['CR']}
                biasByLocation={{ lat: 9.748917, lon: -83.753428 }}
                postprocessHook={handleSelectAddress}
                suggestionsFilter={suggestionsFilter}
                value={selectedLocation}
              />
            </GeoapifyContext>
            <Form.Control
              type="text"
              name="location"
              value={selectedLocation}
              onChange={handleChange}
              required
              hidden
            />
          </Form.Group>

          <Form.Group controlId="formCapacity">
            <Form.Label>Capacity</Form.Label>
            <Form.Control
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPhotos">
            <Form.Label>Photos</Form.Label>
            <Form.Control
              type="file"
              name="photos"
              onChange={handleChange}
              multiple
              accept="image/*"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {initialData ? 'Edit Event' : 'Create New Sports Event'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EventReservationFormModal;
