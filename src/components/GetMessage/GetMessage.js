import React, { useState } from 'react';
import './GetMessage.css'; // You can define your CSS here for styling
import { domainName } from '../../config/urls';

const GetMessage = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [messageFetched, setMessageFetched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessageFetched(false);

    try {
        const response = await fetch(`${ domainName }/addmsg/get` , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
          const data = await response.json();
        setMessage(data.result.length>0 && data.result[0].messages || ['No message found.']);
        setMessageFetched(true);
      } else {
        throw new Error('Failed to fetch the message.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="get-message-container">
      <h2>Wanna see my messages for you?</h2>
      <form onSubmit={handleSubmit} className="get-message-form">
        <div className="form-group">
          <label htmlFor="name">Enter Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
          />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Fetching...' : 'Get Message'}
        </button>
      </form>

      {loading && <div className="loader"></div>}
      {loading && <div>wait I am writing some for you...</div>}
      {error && <div className="error-message">{error}</div>}
      {messageFetched && !error && (
        <div className="message-display">
                  <h3>Message for {name}:</h3>
                  {message && message.map(m => 
                      <p>{m}</p>
                  )}
          
        </div>
      )}
    </div>
  );
};

export default GetMessage;
