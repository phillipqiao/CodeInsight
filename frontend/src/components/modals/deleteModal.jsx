import React, { useContext, useState, useEffect } from 'react';
import "./modal.css";

import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function DeleteModal({ setOpenModal }) {

  const navigate = useNavigate();

  const handleDelete = async () => {
      try {
        const userID = localStorage.getItem('userID');
        const response = await axios.delete(`http://localhost:3010/users/${userID}`);
        console.log('User deleted successfully:', response.data);
      } catch (error) {
          console.error('Error deleting user:', error.message);
      }
  };

  const handleBackSubmit = () => {
    setOpenModal(false);
  };

  const handleDeleteSubmit = () => {
    handleDelete();
    navigate('/'); 
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h1>Delete Account</h1>
        </div>

        <div className="body">
          <p>Are you sure you would like to delete your account?</p>
        </div>
        <div className="footer">
          <button
            onClick={handleBackSubmit}
            id="resumeBtn"
          >
            Back
          </button>

          <button
            onClick={handleDeleteSubmit}
            id="delBtn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;