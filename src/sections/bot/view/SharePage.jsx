/* eslint-disable react/button-has-type */
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import './SharePage.css';

export const SharePage  = () => {
  const { botId } = useParams();
  const [shareLink, setShareLink] = useState('');

  useEffect(() => {
    // Call the backend to get the share link when the component mounts
    const generateShareLink = async () => {
      // Implement the fetch call to the backend here using botId
      // For now, we will mock the share link
      const mockShareLink = `https://share.cody.bot/${botId}`;
      setShareLink(mockShareLink);
    };

    generateShareLink();
  }, [botId]);

   return (
    <div className="share-page">
      <h1>Share Bot</h1>
      {shareLink && (
        <div className="share-link-container">
          <input
            type="text"
            value={shareLink}
            readOnly
            className="share-link-input"
          />
          <button
            onClick={() => navigator.clipboard.writeText(shareLink)}
            className="copy-link-btn"
          >
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
};