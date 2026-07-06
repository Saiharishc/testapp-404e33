import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [health, setHealth] = useState('Loading...');
  const [message, setMessage] = useState('');
  const [echo, setEcho] = useState('');

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setHealth(data.status))
      .catch(error => setHealth('Error fetching health'));
  }, []);

  const handleEcho = () => {
    fetch(`/api/test/${message}`)
      .then(res => res.json())
      .then(data => setEcho(data.message))
      .catch(error => setEcho('Error echoing message'));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>TestApp</h1>
        <p>Health: {health}</p>
        <div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message"
          />
          <button onClick={handleEcho}>Echo Message</button>
        </div>
        {echo && <p>Echoed: {echo}</p>}
      </header>
    </div>
  );
}

export default App;
