// App.js
import React, { useState } from 'react';
import './baseofknowledge.css';
import Sidebar from './components/Sidebar';
import Modal from './components/modal';
import FolderDashboard from './components/dashboard';

const App = () => {
    const [selectedFolderId, setSelectedFolderId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [refreshDashboard, setRefreshDashboard] = useState(false); // State variable to trigger dashboard refresh

    const handleNewFolderClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleFolderClick = (folderId, folderName) => {
        setSelectedFolderId(folderId);
        setSelectedFolder(folderName);
        console.log('Selected folder:', folderId, folderName);
        setRefreshDashboard(prevState => !prevState); // Toggle refreshDashboard key to trigger dashboard refresh
    };

    return (
        <div className="app">
            <Sidebar onNewFolderClick={handleNewFolderClick} onFolderClick={handleFolderClick} />
            {showModal && <Modal onClose={handleCloseModal} />}
            {selectedFolder ? (
                <FolderDashboard folderId={selectedFolderId} folderName={selectedFolder} key={refreshDashboard} />
            ) : (
                <div className="select-folder-label">⬅️ Select a folder</div>
            )}
        </div>
    );
};

export default App;
