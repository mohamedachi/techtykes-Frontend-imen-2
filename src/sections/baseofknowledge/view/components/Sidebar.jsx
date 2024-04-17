import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Sidebar = ({ onNewFolderClick, onFolderClick }) => {
    const [folders, setFolders] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const userDataString = localStorage.getItem("user");
    const userData = JSON.parse(userDataString);
    const userId = userData.id;
    console.log(userId);
    
    const CloseIcon = () => (
        <div className="close-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </div>
      );

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/s/api/folders/user/${userId}`);
                setFolders(response.data);
            } catch (error) {
                console.error('Error fetching folder data:', error);
            }
        };

        fetchFolders();
    }, [userId]);

    const handleFolderClick = (folderId, folderName) => {
        onFolderClick(folderId, folderName);
        console.log('Folder clicked:', folderId, folderName);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            {/* Toggle button */}
            <button className={`toggle-button ${isSidebarOpen ? 'open' : 'closed'}`} onClick={toggleSidebar} style={{ right: isSidebarOpen ? '1001px' : '1278px', transform: isSidebarOpen ? 'rotateY(180deg)' : 'none' }}>
                <CloseIcon />
            </button>
            {/* Sidebar */}
            <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <button className="new-folder-button" onClick={onNewFolderClick}>New Folder</button>
                <input type="text" className="search-bar" placeholder="Search..." />
                <div className="divider"></div>
                <ul className="folder-list">
                    {folders.map(folder => (
                        <React.Fragment key={folder._id}>
                            <li onClick={() => handleFolderClick(folder._id, folder.name)}>{folder.name}</li>
                            <div className="folder-divider"></div>
                        </React.Fragment>
                    ))}
                </ul>
            </div>
        </div>
    );    
};

export default Sidebar;