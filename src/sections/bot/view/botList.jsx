/* eslint-disable react/button-has-type */
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { fetchProfile } from 'src/utils/redux/';


const fetchBots = async () => {
  try {

    if (typeof window !== 'undefined' && window.localStorage) {
  // Get all keys stored in localStorage
  const keys = Object.keys(localStorage);
  
  // Loop through keys and print key-value pairs
  keys.forEach(key => {
    console.log(`${key}: ${localStorage.getItem(key)}`);
  });
} else {
  console.log('localStorage is not supported in this browser.');
}
    
    const userDataString = localStorage.getItem("user");
    const userData = JSON.parse(userDataString);
    const userId = userData.id;
    console.log(userId);


    const response = await fetch(`http://localhost:4000/s/api/bots/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const bots = await response.json();
    return bots; // Assuming your API returns an array of bots directly
  } catch (error) {
    console.error("Failed to fetch bots:", error);
    return []; // Return an empty array in case of error
  }
};

const deleteBot = async (id) => {
  try {
    const response = await fetch(`http://localhost:4000/s/api/bot/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    console.log('Bot deleted successfully');
    return true;
  } catch (error) {
    console.error("Failed to delete bot:", error);
    return false;
  }
};

const sortBots = (bots, sortDirection) => [...bots].sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

export const BotList = () => {
  const [bots, setBots] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
const navigate = useNavigate();

  useEffect(() => {
    fetchBots().then(data => {
      if (data && Array.isArray(data)) {
        setBots(data);
      } else if (data && data.bots && Array.isArray(data.bots)) { 
        setBots(data.bots);
      } else {
        console.error('Data fetched is not properly formatted:', data);
        setBots([]); 
      }
    });
  }, []);

  const handleDelete = async (id) => {
    const isDeleted = await deleteBot(id);
    if (isDeleted) {
      setBots(prevBots => prevBots.filter(bot => bot._id !== id));
    }
  };
const handleShareClick = async (botId) => {
  // Navigate to the share page with the botId
  navigate(`/share/${botId}`);
};

const handleChat = async (botId) => {
  navigate(`/chat/${botId}`);
};
  const sortedBots = sortBots(bots, sortDirection);

  return (
    <>
  <div className="search-bar-container">
  <i className="fa fa-search search-icon" />
  <input
    type="text"
    placeholder="Search Bot Name ..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <i className="fa fa-microphone microphone-icon" />
    <button className="sort-button" onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}>
        Sort by Name {sortDirection === 'asc' ? '🔼' : '🔽'}
      </button>
</div>

    
     
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Model</th>
            <th>Personality</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedBots.filter(bot => 
            bot.name.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((bot) => (
            <tr key={bot._id}>
              <td>{bot.name}</td>
              <td>{bot.description}</td>
              <td>{bot.model}</td>
              <td>{bot.personality}</td>
              <td>
                <button
                  onClick={() => handleDelete(bot._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
                 <button onClick={() => handleShareClick(bot._id)} className="share-btn">
                  Share
                </button>
                <button onClick={() => handleChat(bot._id)} className="btn btn-info">
                  Chat
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
