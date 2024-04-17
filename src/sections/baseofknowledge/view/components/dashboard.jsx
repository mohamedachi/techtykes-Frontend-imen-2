import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Dashboard = ({ folderId, folderName, isSidebarOpen }) => {
    const dashboardClassName = isSidebarOpen ? 'dashboard' : 'dashboard full-width';
    const [showWriteFields, setShowWriteFields] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [storedDocuments, setStoredDocuments] = useState([]);
    

    useEffect(() => {
        if (folderId) {
            // Fetch stored documents for the selected folder
            axios.get(`http://localhost:4000/s/api/folders/${folderId}`)
                .then(response => {
                    const folder = response.data.folder;
                    if (folder && folder.files) {
                        setStoredDocuments(folder.files); // Update stored documents state with fetched files
                    }
                })
                .catch(error => {
                    console.error('Error fetching stored documents:', error);
                });
        }
    }, [folderId]);

    const handleWriteClick = () => {
        setShowWriteFields(true);
    };

    const handleBackClick = () => {
        setShowWriteFields(false);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSaveClick = () => {
        if (!title || !content) {
            setErrorMessage('Please fill out both title and content fields.');
            return;
        }

        axios.post(`http://localhost:4000/s/api/files/add-text-file/${folderId}`, { title, content })
            .then(response => {
                console.log('Text file added successfully:', response.data);
                setShowWriteFields(false);
                setTitle('');
                setContent('');
                setErrorMessage('');
            })
            .catch(error => {
                console.error('Error adding text file:', error);
                setErrorMessage('Failed to add text file. Please try again later.');
            });
    };

    const handleUploadClick = () => {
        document.getElementById('pdf-input').click();
    };


    return (
        <div className={dashboardClassName}>
            <h2>{folderName}</h2>
            <div className="divider"></div>
            {!showWriteFields ? (
                <div className="section">
                    <h3>Create Documents</h3>
                    <p>You can create a new document in this folder by writing or uploading an existing document.</p>
                    <div className="button-container">
                        <button onClick={handleWriteClick}>
                        <span role="img" aria-label="pen">🖊️</span>&nbsp;<strong>Write</strong> Write or copy paste your document
                        </button>
                        <button onClick={handleUploadClick}>
                            <span role="img" aria-label="pen">📤</span>&nbsp;<strong>Upload</strong> WWWPDF,Word, or Powerpoint files
                            </button>
                        <input type="file" id="pdf-input" accept=".pdf" style={{ display: 'none' }} />
                    </div>
                </div>
            ) : (
                <div className="section">
                    <div className="input-group">
                        <label>Document Title:</label>
                        <input type="text" value={title} onChange={handleTitleChange} placeholder="Title" className="text-field" />
                    </div>
                    <div className="input-group">
                        <label>Content:</label>
                        <textarea value={content} onChange={handleContentChange} placeholder="Content" className="text-field content" />
                    </div>
                    <div className="button-container">
                        <button onClick={handleSaveClick}>Save</button>
                        <button onClick={handleBackClick}>Back</button>
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            )}
            <div className="divider"></div>
            <div className="section">
                <h3>Stored Documents</h3>
                <ul>
                    {storedDocuments.map(document => (
                        <li key={document._id}>{document.title}</li>
                    ))}
                </ul>
                <p>These are all uploaded documents that you can learn from.</p>
            </div>
        </div>
    );
};

export default Dashboard;