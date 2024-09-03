import React, { useState,  createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CalendarView from './components/CalendarView';
import EventForm from './components/EventForm';
import EventDetails from './components/EventDetails';
import './index.css';

export const EventContext = createContext();


function App() {
  const [events, setEvents] = useState([
    { id: '1', title: 'Meeting with Team', date: '2024-09-10', category: 'Work' },
    { id: '2', title: 'Doctor Appointment', date: '2024-09-15', category: 'Personal' },
    { id: '3', title: 'Project Deadline', date: '2024-09-20', category: 'Work' },
  ]);

  const addEvent = (newEvent) => setEvents([...events, { ...newEvent, id: Date.now().toString() }]);
  const updateEvent = (updatedEvent) => setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  const deleteEvent = (id) => setEvents(events.filter(e => e.id !== id));

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<CalendarView />} />
            <Route path="/event/new" element={<EventForm />} />
            <Route path="/event/edit/:id" element={<EventForm />} />
            <Route path="/event/:id" element={<EventDetails />} />
          </Routes>
        </div>
      </Router>
    </EventContext.Provider>
  );
}

export default App;
