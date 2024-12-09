import React from 'react';
import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faInfoCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/EventItem.css';
import moment from 'moment';

/**
 * EventItem
 * 
 * This component renders an individual event item in the calendar. It displays
 * event details and provides options to view, edit, or delete the event.
 * 
 * @param {Object} props - The props for the component.
 * @param {Object} props.event - The event object containing event details.
 * @param {Function} props.onView - Function to handle viewing the event.
 * @param {Function} props.onEdit - Function to handle editing the event.
 * @param {Function} props.onDelete - Function to handle deleting the event.
 * @param {String} props.view - The current calendar view.
 * 
 * @returns {JSX.Element} The rendered event item component.
 */
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
            <Dropdown.Item className='dropdown-item-option' onClick={() => onDelete(event.id)} disabled={isPastEvent}>
              <FontAwesomeIcon icon={faTrash} className="me-2" /> Delete Event
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );

  const renderEventWithTooltip = () => (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip>{event.name}</Tooltip>}
    >
      {renderEventContent()}
    </OverlayTrigger>
  );

  return (
    <div className={`event-item-wrapper ${view !== 'agenda' && 'show-tooltip'}`}>
      {view !== 'agenda' ? renderEventWithTooltip() : renderEventContent()}
    </div>
  );
};

export default EventItem;
