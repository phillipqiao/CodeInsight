import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import './AccountPage.css';
import { useNavigate } from 'react-router-dom';
import Profile from '../images/Profile';
import DeleteModal from '../modals/deleteModal';
import { FaStar } from "react-icons/fa";

const AccountPage = () => {
  
  const [modalOpen, setModalOpen] = useState(false);
  const [codeSample, setCodeSample] = useState('');
  // const [userID, setUserID] = useState(null);
  const [userName, setUname] = useState(null);
  const [email, setEmail] = useState(null);
  const [totalStars, setTotalStars] = useState(0);

  const [pastAttempts, setPastAttempts] = useState([]);
  
  const navigate = useNavigate();


  useEffect(() => {

  
    const fetchUserInfo = async () => {
        try {
          const userID = localStorage.getItem('userID');
          const response = await axios.get(`http://localhost:3010/users/${userID}`);
          const userInfo = response.data;
          // console.log(JSON.stringify(userInfo));
          // console.log(JSON.stringify(userInfo.email));
          // console.log(JSON.stringify(userInfo.username));
          setEmail(userInfo.email);
          setUname(userInfo.username);
          // if (userInfo.length != null) {
          //   setUname(userInfo[0]);
          //   setEmail(userInfo[0].email);
          // } else {
          //   console.error('No user info ffasdfadfaound');
          // }
        } catch (error) {
          console.error('Error fetching code sample:', error);
        }
    };

    const fetchPastAttempts = async () => {
      try {
          const userID = localStorage.getItem('userID');
          const response = await axios.get(`http://localhost:3010/questionAttempts/${userID}`);
          setPastAttempts(response.data);
      } catch (err) {
          console.error('Error fetching question attempts:', err.message);
      }
  };

  const fetchTotalStars = async () => {
    try {
        const userID = localStorage.getItem('userID');
        const response = await axios.get(`http://localhost:3010/sumStars/${userID}`);
        setTotalStars(response.data.sumStars);
    } catch (err) {
        console.error('Error fetching total stars:', err.message);
    }
};

  fetchUserInfo();
  fetchTotalStars();
  fetchPastAttempts();
  }, []);

  const handleSubmit = () => {
    navigate('/ViewStats',{ state: { pastAttempts } }); 
  };

  const handleDeleteSubmit = () => {
    setModalOpen(true);
  };

  const handleLogoutSubmit = () => {
    navigate('/');
  };

  const handleHomeSubmit = () => {
    navigate('/home');
  };

  // console.log(`account out${userName}`);
  // console.log(`account out${passWord}`);

  useEffect(() => {
    if (userName) {
      console.log(`Account username: ${userName}`);
    }
    if (email) {
      console.log(`Account email: ${email}`);
    }
  }, [userName, email]);

  return (
    <div className = 'account'>
    <div className="account-container">
      <h2 className="account-title">My Account</h2>
      
      <div className = "profile-container">
        <Profile src="https://gifdb.com/images/high/glitched-effect-the-hackerman-vuiybcnou8wgh295.webp" alt="Profile"/>
        <div className="code-container userinfo">
          <label>
            <strong>Username : </strong>
            {/* <input
              type="text"
              value={userName}
              readOnly
            /> */}

            <span className="username">{userName}</span>

          </label>
          <br />
          <label>
            <strong>Email : </strong>
            <span className="username">{email}</span>
          </label>
          <br />
          <label>
            <strong>Stars Earned : </strong>
            <span className="username">{totalStars} <FaStar className="star-icon"/></span>
          </label>
        </div>
      </div>
      
      
      <div className="accbutton-container">
        <button onClick={handleHomeSubmit} className="submit-button home-button">
          Home
        </button>
        <button onClick={handleDeleteSubmit} className="submit-button">
          Delete Account
        </button>
        <button onClick={handleSubmit} className="submit-button">
          View Past Attempts
        </button>
        <button onClick={handleLogoutSubmit} className="submit-button logout-button">
          Log Out
        </button>
      </div>
    </div>
      {modalOpen && <DeleteModal setOpenModal={setModalOpen} />}
    </div>
  );
};

export default AccountPage;