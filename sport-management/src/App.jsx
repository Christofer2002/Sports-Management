import { useState } from 'react'
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './styles/index.css';
import { CalendarComponent } from './features/Calendar/components/';

/**
 * App Component
 * 
 * The main application component that serves as the entry point for the application.
 * It imports and applies global styles, initializes the app state, and renders the CalendarComponent.
 * 
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  return (
    <div className="App">
      <CalendarComponent />
    </div>
  )
}

export default App;
