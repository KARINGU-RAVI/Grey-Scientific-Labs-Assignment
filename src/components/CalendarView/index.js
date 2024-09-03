import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import { EventContext } from './../../App.js';
import './index.css';

function CalendarView() {
  const [date, setDate] = useState(new Date());
  const { events } = useContext(EventContext);
  const [filter, setFilter] = useState('All');

  const filteredEvents = filter === 'All' ? events : events.filter(event => event.category === filter);

  return (
    <div className="calendar-view">
      <h1 >My Calendar</h1>
      <Calendar value={date} onChange={setDate}
     
      />
      <div className="filter">
        <label>Filter by Category:</label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="All">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>
      <div className="events">
        <Link to="/event/new">
          <button className="add-event-btn">Add New Event</button>
        </Link>
        {filteredEvents.map(event => (
          <Link  className="event-item"  to={`/event/${event.id}`} key={event.id}>
            <div className="event-item">
              <h3>{event.title}</h3>
              <p>{event.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CalendarView;
