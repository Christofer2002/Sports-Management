import React from 'react';
import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faInfoCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/EventItem.css';
import moment from 'moment';

const EventItem = ({ event, onView, onEdit, onDelete, view }) => {
  const isPastEvent = moment(event.end).isBefore(moment());

  const renderEventContent = () => (
    <div 
      className={`event-item ${isPastEvent ? 'past-event' : ''}`}
      onClick={() => view !== 'agenda' && onView(event)}
    >
      <span className={`event-title ${isPastEvent ? 'past-event-title' : ''}`}>
        {event.name}
      </span>
      {view === 'agenda' && (
        <Dropdown align="end" className="event-dropdown">
          <Dropdown.Toggle as="span" className="dropdown-icon">
            <FontAwesomeIcon icon={faCog} />
          </Dropdown.Toggle>
          <Dropdown.Menu className='dropdown-menu'>
            <Dropdown.Item className='dropdown-item-option' onClick={() => onView(event)}>
              <FontAwesomeIcon icon={faInfoCircle} className="me-2" /> More Information
            </Dropdown.Item>
            <Dropdown.Item className='dropdown-item-option' onClick={() => onEdit(event)} disabled={isPastEvent}>
              <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit Event
            </Dropdown.Item>
            <Dropdown.Item className='dropdown-item-option' onClick={() => onDelete(event)} disabled={isPastEvent}>
              <FontAwesomeIcon icon={faTrash} className="me-2" /> Delete Event
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );

  return view !== 'agenda' ? (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip>Click to view details</Tooltip>}
    >
      {renderEventContent()}
    </OverlayTrigger>
  ) : (
    renderEventContent()
  );
};

export default EventItem;
