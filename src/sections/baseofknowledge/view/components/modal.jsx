import React, { useState } from "react";
import axios from "axios";

const Modal = ({ onClose }) => {
  const [folderName, setFolderName] = useState("");

  const handleSave = () => {
    const userDataString = localStorage.getItem("user");
        const userData = JSON.parse(userDataString);
        const UserId = userData.id;
        console.log(UserId);
    if (!folderName.trim()) {
      setError("Folder name cannot be empty."); // Set error state
      return;
    }
    console.log("Folder name:", folderName); // Log the folder name before making the request
    // Make a POST request to your backend API endpoint
    axios
     .post("http://localhost:4000/s/api/folders/create-folder", { folderName , UserId })
      .then((response) => {
        console.log("Folder added successfully:", response.data);
        onClose(); // Close the modal after successfully adding the folder
      })
      .catch((error) => {
        console.error("Error adding folder:", error);
        // Handle error (e.g., display error message to the user)
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create Folder</h2>
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Folder name"
        />
        <div className="button-container2">
          <button className="create-button" onClick={handleSave}>
            Create
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;