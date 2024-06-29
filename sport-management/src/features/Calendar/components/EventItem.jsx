import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faInfoCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/EventItem.css';

const EventItem = ({ event, onView, onEdit, onDelete }) => {
  return (
    <div className="event-item">
      <span className="event-title">{event.name}</span>
      <Dropdown align="end" className="event-dropdown">
        <Dropdown.Toggle as="span" className="dropdown-icon">
          <FontAwesomeIcon icon={faCog} />
        </Dropdown.Toggle>
        <Dropdown.Menu className='dropdown-menu'>
          <Dropdown.Item className='dropdown-item-option' onClick={() => onView(event)}>
            <FontAwesomeIcon icon={faInfoCircle} className="me-2" /> Ver más información
          </Dropdown.Item>
          <Dropdown.Item className='dropdown-item-option' onClick={() => onEdit(event)}>
            <FontAwesomeIcon icon={faEdit} className="me-2" /> Editar evento
          </Dropdown.Item>
          <Dropdown.Item className='dropdown-item-option' onClick={() => onDelete(event)}>
            <FontAwesomeIcon icon={faTrash} className="me-2" /> Eliminar evento
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default EventItem;
