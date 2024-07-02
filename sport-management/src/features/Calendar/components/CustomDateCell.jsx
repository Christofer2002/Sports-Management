import React from 'react';
import moment from 'moment';

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
