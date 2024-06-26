import React, { useState, useEffect } from 'react';
import { Store } from 'react-notifications-component';
import { Modal, Button, Form } from 'react-bootstrap';
import eventsService from '../../../services/eventsService';
import Select from 'react-select';
import eventTypes from '../../../data/eventTypes';
import '../styles/ReservationFormModal.css';

const ReservationFormModal = ({ show, handleClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    capacity: '',
    description: '',
    date: '',
    photos: []
  });

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
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photos') {
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, type: selectedOption.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      Store.addNotification({
        title: "Error",
        message: "Failed to add event.",
        type: "danger",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      });
    }
  };

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
              onChange={handleSelectChange}
              options={eventTypes}
              placeholder="Select event type"
              required
            />
          </Form.Group>

          <Form.Group controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
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
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReservationFormModal;