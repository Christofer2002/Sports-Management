import { useState } from 'react'
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './styles/index.css';
import CalendarComponent from './features/Calendar/components/CalendarComponent';

function App() {

  return (
    <div className="App">
      <CalendarComponent />
    </div>
  )
}

export default App
