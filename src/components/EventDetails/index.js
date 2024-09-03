import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EventContext } from './../../App';
import './index.css';

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, deleteEvent } = useContext(EventContext);

  const event = events.find(e => e.id === id);

  const handleDelete = () => {
    deleteEvent(id);
    navigate('/');
  };

  if (!event) return <div>Event not found</div>;

  return (
    <div className="event-details">
      <h1>{event.title}</h1>
      <p>Date: {event.date}</p>
      <p>Category: {event.category}</p>
      <button onClick={() => navigate(`/event/edit/${id}`)}>Edit</button>
      <button onClick={handleDelete} className="delete-btn">Delete</button>
    </div>
  );
}

export default EventDetails;
