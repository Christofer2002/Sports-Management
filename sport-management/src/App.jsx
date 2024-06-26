import { useState } from 'react'
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './styles/index.css';
import CalendarComponent from './features/Calendar/CalendarComponent';
import Header from './components/Header';

function App() {

  return (
    <div className="App">
      <Header />
      <CalendarComponent />
    </div>
  )
}

export default App
