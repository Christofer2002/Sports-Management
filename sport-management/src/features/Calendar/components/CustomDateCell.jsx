import React from 'react';
import moment from 'moment';

/**
 * CustomDateCell
 * 
 * This component renders a custom date cell for the calendar. It highlights
 * the current day and displays a "Today" indicator.
 * 
 * @param {Object} props - The props for the component.
 * @param {Date} props.value - The date value for the cell.
 * @param {ReactNode} props.children - The children elements to render inside the cell.
 * 
 * @returns {JSX.Element} The rendered date cell component.
 */
const CustomDateCell = ({ value, children }) => {
  const isToday = moment().isSame(value, 'day');

  return (
    <div className={`rbc-day-bg ${isToday ? 'rbc-today' : ''}`}>
      {isToday && <div className="today-indicator">Today</div>}
      {children}
    </div>
  );
};

export default CustomDateCell;
