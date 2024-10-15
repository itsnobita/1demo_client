import React, { useState } from 'react';
import './MessageForm.css'; // You can define your CSS here for styling
import { domainName } from '../../config/urls';

const MessageForm = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      const response = await fetch(`${domainName}/addmsg/set`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, message }),
      });

      if (response.ok) {
        setSuccess(true);
        setName(''); // Reset form fields
        setMessage('');
      } else {
        throw new Error('Failed to send the message');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="message-form-container">
      <h2>Send a Message</h2>
      <form onSubmit={handleSubmit} className="message-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Enter your message"
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>

      {loading && <div className="loader">Sending your message...</div>}
      {success && <div className="success-message">Message sent successfully!</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default MessageForm;
