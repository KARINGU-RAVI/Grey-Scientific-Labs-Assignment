import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EventContext } from './../../App.js';
import './index.css';

function EventForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, addEvent, updateEvent } = useContext(EventContext);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Work');

  useEffect(() => {
    if (id) {
      const event = events.find(e => e.id === id);
      if (event) {
        setTitle(event.title);
        setDate(event.date);
        setCategory(event.category);
      }
    }
  }, [id, events]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = { id: id || Date.now().toString(), title, date, category };
    if (id) {
      updateEvent(newEvent);
    } else {
      addEvent(newEvent);
    }
    navigate('/');
  };

  return (
    <div className="event-form">
      <h1>{id ? 'Edit Event' : 'Add Event'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>
        </label>
        <button type="submit">{id ? 'Update Event' : 'Add Event'}</button>
      </form>
    </div>
  );
}

export default EventForm;
